import { useQuery } from '@tanstack/react-query'
import { Provider } from '@wagmi/core'
import { atom, useAtomValue } from 'jotai'
import { atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query'
import { atomFamily } from 'jotai/utils'
import { marketDataAddress } from 'perps-hooks'
import { useNetwork, useProvider } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { connectedChainAtom, providerAtom } from '../jotai-wagmi'
import { MarketKey } from '../price/pyth'
import {
  MarketSummaries,
  MarketSummary,
  fetchMarketSettings,
  fetchMarketSummary,
  fetchMarkets,
  marketSettingsQueryKey,
  marketsQueryKey,
} from './markets'

export function useMarkets<TSelectData = MarketSummaries>({
  select,
  chainId: _chainId,
}: {
  chainId?: keyof typeof marketDataAddress
  select?: (markets: MarketSummaries) => TSelectData
} = {}) {
  const { chain } = useNetwork()
  const chainId = _chainId || chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

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
*/
export const routeMarketKeyAtom = atom<MarketSummary['key']>('sETHPERP')
export const marketAtoms = atomFamily((marketKey: MarketKey) => {
  const [, marketAtom] = atomsWithQuery<MarketSummary>((get) => {
    const chain = get(connectedChainAtom)
    const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id
    const provider = get(providerAtom)
    const queryClient = get(queryClientAtom)
    return {
      queryKey: ['market summary', marketKey, chainId],
      queryFn: () => fetchMarketSummary({ marketKey, provider, chainId }),
      initialData: () => {
        const allMarkets = queryClient.getQueryData(marketsQueryKey(chainId)) as MarketSummaries
        return allMarkets?.find((m) => m.key === marketKey)
      },
      staleTime: 20 * 1000, // 20s
      cacheTime: Infinity,
      keepPreviousData: true,
    }
  })
  return marketAtom
})
export const routeMarketAtom = atom((get) => get(marketAtoms(get(routeMarketKeyAtom))))
export const useRouteMarket = () => useAtomValue(routeMarketAtom).data

export const marketSettingsAtoms = atomFamily((marketKey: MarketKey | undefined) => {
  const [, queryAtom] = atomsWithQuery((get) => {
    const chain = get(connectedChainAtom)
    const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id
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
