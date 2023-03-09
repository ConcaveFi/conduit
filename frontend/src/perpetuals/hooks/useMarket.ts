import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getContract, Provider, ReadContractResult } from '@wagmi/core'
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

type MarketSummariesResult = ReadContractResult<typeof marketDataABI, 'allProxiedMarketSummaries'>
const parseMarketSummaries = (summaries: MarketSummariesResult) =>
  summaries.map(({ market, key, asset, feeRates, currentFundingRate, ...s }) => ({
    market,
    address: market,
    key: parseBytes32String(key) as MarketKey,
    asset: parseBytes32String(asset) as MarketAsset,
    feeRates: valuesToFixedNumber(feeRates),
    currentFundingRate: FixedNumber.from(currentFundingRate.div(24), 6), // 1hr Funding Rate
    ...valuesToFixedNumber(s),
  }))
export type MarketSummaries = ReturnType<typeof parseMarketSummaries>

export function useMarkets<TSelectData = MarketSummaries>({
  select,
  ...config
}: Omit<
  UseContractReadConfig<typeof marketDataABI, 'allProxiedMarketSummaries', ReadContractResult>,
  'abi' | 'address' | 'functionName' | 'select'
> & {
  chainId?: keyof typeof marketDataAddress
  select?: UseQueryOptions<MarketSummaries, unknown, TSelectData>['select']
} = {}) {
  const { chain } = useNetwork()
  const chainId =
    config.chainId || (!chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId))

  return useContractRead({
    abi: marketDataABI,
    address: marketDataAddress[chainId],
    chainId,
    functionName: 'allProxiedMarketSummaries',
    refetchInterval: 2500,
    // refetchIntervalInBackground: true,
    ...config,
    select: useCallback(
      (summariesResult) => {
        const summaries = parseMarketSummaries(summariesResult)
        return select ? select(summaries) : (summaries as TSelectData)
      },
      [select],
    ),
  })
}

export const useRouteMarket = () => {
  const searchParams = useSearchParams()
  const asset = searchParams?.get('asset')

  const { data: market } = useMarkets({
    select: useCallback(
      (markets: MarketSummaries) => markets.find((m) => m.asset === asset),
      [asset],
    ),
  })

  return market
}

const fetchMarketSettings = async ({
  provider,
  chainId,
  marketKey,
}: {
  provider: Provider
  chainId: number
  marketKey: MarketKey
}) => {
  const marketSettings = getContract({
    address: marketSettingsAddress[chainId],
    abi: marketSettingsABI,
    signerOrProvider: provider,
  })
  const marketKeyHex = formatBytes32String(marketKey)
  const [skewScale, minInitialMargin, minKeeperFee] = await Promise.all([
    marketSettings.skewScale(marketKeyHex),
    marketSettings.minInitialMargin(),
    marketSettings.minKeeperFee(),
    // marketSettings.maxKeeperFee(),
    // marketSettings.liquidationBufferRatio(),
    // marketSettings.liquidationFeeRatio(),
    // marketSettings.liquidationFeeRatio(),
  ])
  return valuesToFixedNumber({ skewScale: skewScale, minInitialMargin, minKeeperFee })
}

type MarketSettings = Awaited<ReturnType<typeof fetchMarketSettings>>

export function useMarketSettings<TSelectData = MarketSettings>({
  marketKey,
  select,
  ...config
}: {
  marketKey: MarketKey | undefined
  select?: (d: Awaited<ReturnType<typeof fetchMarketSettings>>) => TSelectData
  chainId?: SupportedChainId
}) {
  const { chain } = useNetwork()
  const chainId =
    config.chainId || (!chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId))

  const provider = useProvider({ chainId })

  return useQuery(
    ['marketSettings', marketKey],
    async () => fetchMarketSettings({ marketKey: marketKey!, chainId, provider }),
    {
      enabled: !!marketKey,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select,
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )
}
