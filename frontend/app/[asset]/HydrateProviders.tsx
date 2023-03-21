'use client'

import { Hydrate, useQueryClient } from '@tanstack/react-query'
import { queryClientAtom } from 'jotai-tanstack-query'
import { useHydrateAtoms } from 'jotai/utils'
import { PropsWithChildren } from 'react'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
import { MarketSummary } from './lib/market/markets'
import { routeMarketKeyAtom } from './lib/market/useMarket'

export function HydrateAtoms({ routeMarket: s_routeMarket }: { routeMarket: SuperJSONResult }) {
  const routeMarket = deserialize(s_routeMarket) as MarketSummary

  const queryClient = useQueryClient()

  useHydrateAtoms([
    [routeMarketKeyAtom, routeMarket.key],
    [queryClientAtom, queryClient],
  ])

  return null
}

export { Provider as JotaiProvider } from 'jotai'

export function ReactQueryHydrate({
  dehydratedState,
  children,
}: PropsWithChildren<{ dehydratedState: SuperJSONResult }>) {
  const state = deserialize(dehydratedState)

  return <Hydrate state={state}>{children}</Hydrate>
}
