import { useQuery } from '@tanstack/react-query'
import { getContract, Provider, ReadContractResult } from '@wagmi/core'
import { divide, Dnum, format, from } from 'dnum'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils'
import { atom, useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useSearchParams } from 'next/navigation'
import {
  marketDataABI,
  marketDataAddress,
  marketSettingsABI,
  marketSettingsAddress,
} from 'perps-hooks'
import { MarketAsset, MarketKey } from 'perps-hooks/markets'
import { valuesToBigInt } from 'perps-hooks/parsers'
import { useCallback, useRef } from 'react'
import { SupportedChainId } from 'src/app/[asset]/providers/WagmiProvider'

import { useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'
import {
  fetchMarketSettings,
  marketSettingsQueryKey,
  MarketSummaries,
  MarketSettings,
  fetchMarkets,
  marketsQueryKey,
} from '../lib/markets'

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

  const provider = useProvider<Provider>({ chainId })

  return useQuery(marketsQueryKey(chainId), async () => fetchMarkets({ chainId, provider }), {
    // refetchInterval: 2500,
    // refetchIntervalInBackground: true,
    staleTime: 2000,
    select,
  })
}

export const routeMarketAtom = atom<MarketSummaries[number]>({} as MarketSummaries[number])
export const useRouteMarket = () => useAtomValue(routeMarketAtom)

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

  const provider = useProvider<Provider>({ chainId })

  return useQuery(
    marketSettingsQueryKey(marketKey, chainId),
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
