import { useQuery } from '@tanstack/react-query'
import { Provider } from '@wagmi/core'
import { SupportedChainId } from 'app/providers/WagmiProvider'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { atom, useAtomValue } from 'jotai'
import { marketDataAddress } from 'perps-hooks'

import { useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'
import {
  fetchMarkets,
  fetchMarketSettings,
  MarketSettings,
  marketSettingsQueryKey,
  marketsQueryKey,
  MarketSummaries,
} from './markets'

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
