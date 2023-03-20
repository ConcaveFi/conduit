import { QueryObserver, QueryObserverResult, useQuery } from '@tanstack/react-query'
import { Provider } from '@wagmi/core'
import { SupportedChainId } from 'app/providers/WagmiProvider'
import type { WritableAtom } from 'jotai'
import { atom, useAtomValue } from 'jotai'
import { atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query'
import { atomFamily } from 'jotai/utils'
import { marketDataAddress } from 'perps-hooks'
import { useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { connectedChainAtom, providerAtom } from '../jotai-wagmi'
import { MarketKey } from '../price/pyth'
import {
  fetchMarkets,
  fetchMarketSettings,
  fetchMarketSummary,
  marketSettingsQueryKey,
  marketsQueryKey,
  MarketSummaries,
  MarketSummary,
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

/*
  all markets are prefetched on server and already on the react-query cache 
  ssr also hydrates an atom with the current route market key
  in the client it starts refetching the route market summary every 20 seconds
  which updates market skew, funding rate, etc

  we can assume routeMarket it's always defined
  if something went really wrong on ssr it should throw and get caught on a error boundary upstream
*/
type Action = {
  type: 'refetch'
  force?: boolean
  options?: Parameters<QueryObserver['refetch']>[0]
}
export const routeMarketKeyAtom = atom<MarketSummary['key']>('sETHPERP')
export const [routeMarketAtom] = atomsWithQuery<MarketSummary>((get) => {
  const chain = get(connectedChainAtom)
  const chainId = !chain || chain?.unsupported ? optimism.id : (chain.id as SupportedChainId)
  const provider = get(providerAtom)
  const marketKey = get(routeMarketKeyAtom)
  return {
    queryKey: ['market summary', marketKey, chainId],
    queryFn: () => fetchMarketSummary({ marketKey, provider, chainId }),
    initialData: () => {
      const allMarkets = get(queryClientAtom).getQueryData(
        marketsQueryKey(chainId),
      ) as MarketSummaries
      return allMarkets.find((m) => m.key === marketKey)
    },
    staleTime: 20 * 1000, // 20s
    cacheTime: Infinity,
    keepPreviousData: true,
  }
}) as [
  dataAtom: WritableAtom<
    MarketSummary,
    [Action],
    Promise<QueryObserverResult<MarketSummary, unknown>> | undefined
  >,
  statusAtom: WritableAtom<
    QueryObserverResult<MarketSummary, unknown>,
    [Action],
    Promise<QueryObserverResult<MarketSummary, unknown>> | undefined
  >,
]
export const useRouteMarket = () => useAtomValue(routeMarketAtom)

export const marketSettingsAtoms = atomFamily((marketKey: MarketKey | undefined) => {
  const [, queryAtom] = atomsWithQuery((get) => {
    const chain = get(connectedChainAtom)
    const chainId = !chain || chain?.unsupported ? optimism.id : (chain.id as SupportedChainId)
    const provider = get(providerAtom)
    return {
      queryKey: marketSettingsQueryKey(marketKey, chainId),
      queryFn: () => fetchMarketSettings({ marketKey: marketKey!, chainId, provider }),
      enabled: !!marketKey,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  })
  return queryAtom
})

export function useMarketSettings({ marketKey }: { marketKey: MarketKey | undefined }) {
  return useAtomValue(marketSettingsAtoms(marketKey))
}
