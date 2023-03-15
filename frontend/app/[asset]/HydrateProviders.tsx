'use client'

import { Hydrate } from '@tanstack/react-query'
import { useHydrateAtoms } from 'jotai/utils'
import { PropsWithChildren } from 'react'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
import { MarketSummaries } from './lib/market/markets'
import { routeMarketAtom } from './lib/market/useMarket'

export function HydrateAtoms({ routeMarket: s_routeMarket }: { routeMarket: SuperJSONResult }) {
  const routeMarket = deserialize(s_routeMarket) as MarketSummaries[number]

  useHydrateAtoms([[routeMarketAtom, routeMarket]])

  return null
}

export { Provider as JotaiProvider } from 'jotai'

export default function ReactQueryHydrate({
  dehydratedState,
  children,
}: PropsWithChildren<{ dehydratedState: SuperJSONResult }>) {
  const state = deserialize(dehydratedState)

  return <Hydrate state={state}>{children}</Hydrate>
}
