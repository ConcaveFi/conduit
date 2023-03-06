import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getContract, ReadContractResult } from '@wagmi/core'
import { FixedNumber } from 'ethers'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useContractRead, UseContractReadConfig } from 'ngmi/useContractRead'
import {
  marketDataABI,
  marketDataAddress,
  marketSettingsABI,
  marketSettingsAddress,
} from 'perps-hooks'
import { MarketAsset, MarketKey } from 'perps-hooks/markets'
import { valuesToFixedNumber } from 'perps-hooks/parsers'
import { useCallback } from 'react'
import { SupportedChainId } from 'src/providers/WagmiProvider'

import { useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'

type MarketSettings = {}

export function useMarketSettings({
  marketKey,
  ...config
}: {
  marketKey: MarketKey | undefined
  chainId?: SupportedChainId
}) {
  const { chain } = useNetwork()
  const chainId =
    config.chainId || (!chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId))

  const provider = useProvider({ chainId })

  return useQuery({
    queryKey: ['marketSettings', marketKey],
    queryFn: async () => {
      const marketSettings = getContract({
        address: marketSettingsAddress[chainId],
        abi: marketSettingsABI,
        signerOrProvider: provider,
      })
      const [skewScale] = await Promise.all([
        marketSettings.skewScale(formatBytes32String(marketKey!)),
      ])
      return {
        skewScale,
      }
    },
    enabled: !!marketKey,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

type MarketSummariesResult = ReadContractResult<typeof marketDataABI, 'allProxiedMarketSummaries'>
const parseMarketSummaries = (summaries: MarketSummariesResult, settings?: MarketSettings) =>
  summaries.map(({ market, key, asset, feeRates, currentFundingRate, marketSkew, ...summary }) => ({
    market,
    address: market,
    key: parseBytes32String(key) as MarketKey,
    asset: parseBytes32String(asset) as MarketAsset,
    feeRates: valuesToFixedNumber(feeRates),
    currentFundingRate: FixedNumber.from(currentFundingRate.div(24), 6), // 1hr Funding Rate
    marketSkew,
    ...valuesToFixedNumber(summary),
  }))
export type MarketSummaries = ReturnType<typeof parseMarketSummaries>

export function useMarkets<TSelectData = MarketSummaries>(
  config: Omit<
    UseContractReadConfig<typeof marketDataABI, 'allProxiedMarketSummaries', ReadContractResult>,
    'abi' | 'address' | 'functionName' | 'select'
  > & {
    chainId?: keyof typeof marketDataAddress
    select?: UseQueryOptions<MarketSummaries, unknown, TSelectData>['select']
  } = {},
) {
  const { chain } = useNetwork()
  const chainId =
    config.chainId || (!chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId))

  return useContractRead({
    abi: marketDataABI,
    address: marketDataAddress[chainId],
    chainId,
    functionName: 'allProxiedMarketSummaries',
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    ...config,
    select: useCallback(
      (summariesResult) => {
        const summaries = parseMarketSummaries(summariesResult)
        return config.select ? config.select(summaries) : (summaries as TSelectData)
      },
      [config.select],
    ),
  })
}

export const useRouteMarket = () => {
  const searchParams = useSearchParams()
  const asset = searchParams?.get('asset')

  const { data: market } = useMarkets({
    select: useCallback(
      (markets: MarketSummaries & { price: FixedNumber }) => markets.find((m) => m.asset === asset),
      [asset],
    ),
  })

  return market
}
