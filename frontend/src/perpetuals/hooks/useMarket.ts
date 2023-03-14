import { useQuery } from '@tanstack/react-query'
import { getContract, Provider, ReadContractResult } from '@wagmi/core'
import { divide, Dnum, format, from } from 'dnum'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils'
import { useSearchParams } from 'next/navigation'
import {
  marketDataABI,
  marketDataAddress,
  marketSettingsABI,
  marketSettingsAddress,
} from 'perps-hooks'
import { MarketAsset, MarketKey } from 'perps-hooks/markets'
import { valuesToBigInt } from 'perps-hooks/parsers'
import { useCallback } from 'react'
import { SupportedChainId } from 'src/providers/WagmiProvider'

import { useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'

export type MarketSummariesResult = ReadContractResult<
  typeof marketDataABI,
  'allProxiedMarketSummaries'
>
const parseMarketSummaries = (summaries: MarketSummariesResult) =>
  summaries.map(({ key, asset, feeRates, market: address, ..._market }) => {
    const m = valuesToBigInt(_market)
    const fee = valuesToBigInt(feeRates)
    return {
      address: address,
      key: parseBytes32String(key) as MarketKey,
      asset: parseBytes32String(asset) as MarketAsset,
      feeRates: {
        // ----- we only doing offchain delayed orders rn -----
        // takerFee: from([fee.takerFee, 18]),
        // makerFee:  from([fee.makerFee, 18]),
        // takerFeeDelayedOrder:  from([fee.takerFeeDelayedOrder, 18]),
        // makerFeeDelayedOrder:  from([fee.makerFeeDelayedOrder, 18]),
        // ----------------------------------------------------
        takerFeeOffchainDelayedOrder: from([fee.takerFeeOffchainDelayedOrder, 18]),
        makerFeeOffchainDelayedOrder: from([fee.makerFeeOffchainDelayedOrder, 18]),
        overrideCommitFee: from([fee.overrideCommitFee, 18]),
      },
      currentFundingRate: divide([m.currentFundingRate, 16], 24), // 1hr Funding Rate
      price: from([m.price, 18]),
      currentFundingVelocity: from([m.currentFundingVelocity, 18]),
      marketDebt: from([m.marketDebt, 18]),
      marketSize: from([m.marketSize, 18]),
      marketSkew: from([m.marketSkew, 18]),
      maxLeverage: from([m.maxLeverage, 18]),
    }
  })
export type MarketSummaries = ReturnType<typeof parseMarketSummaries>

export const marketsQueryKey = (chainId: SupportedChainId) => ['all markets summaries', chainId]

const fetchMarkets = async ({ provider, chainId }: { provider: Provider; chainId: number }) => {
  const marketData = getContract({
    address: marketDataAddress[chainId],
    abi: marketDataABI,
    signerOrProvider: provider,
  })
  const markets = await marketData.allProxiedMarketSummaries()
  return parseMarketSummaries(markets)
}

export function useMarkets<TSelectData = MarketSummaries>({
  select,
  chainId: _chainId,
}: {
  chainId?: keyof typeof marketDataAddress
  select?: (markets: MarketSummaries) => TSelectData
} = {}) {
  const { chain } = useNetwork()
  const chainId =
    _chainId || (!chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId))

  const provider = useProvider({ chainId })

  return useQuery({
    queryKey: marketsQueryKey(chainId),
    queryFn: async () => fetchMarkets({ chainId, provider }),
    // refetchInterval: 2500,
    // refetchIntervalInBackground: true,
    staleTime: 2000,
    select,
  })
}

export const useRouteMarket = <TSelect = MarketSummaries[number]>({
  select,
}: {
  select?: (m: MarketSummaries[number]) => TSelect
} = {}) => {
  const searchParams = useSearchParams()
  const asset = searchParams?.get('asset')

  const { data: market } = useMarkets({
    select: useCallback(
      (markets: MarketSummaries) => {
        const market = markets.find((m) => m.asset === asset)
        if (!market) return
        return select ? select(market) : (market as TSelect)
      },
      [asset, select],
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
  const [skewScale, minInitialMargin, minKeeperFee, maxMarketValue] = await Promise.all([
    marketSettings.skewScale(marketKeyHex),
    marketSettings.minInitialMargin(),
    marketSettings.minKeeperFee(),
    marketSettings.maxMarketValue(marketKeyHex),
    // marketSettings.maxKeeperFee(),
    // marketSettings.liquidationBufferRatio(),
    // marketSettings.liquidationFeeRatio(),
    // marketSettings.liquidationFeeRatio(),
  ])
  const s = valuesToBigInt({ maxMarketValue, skewScale, minInitialMargin, minKeeperFee })
  return {
    skewScale: from([s.skewScale, 18]),
    minInitialMargin: from([s.minInitialMargin, 18]),
    minKeeperFee: from([s.minKeeperFee, 18]),
    maxMarketValue: from([s.maxMarketValue, 18]),
  }
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
