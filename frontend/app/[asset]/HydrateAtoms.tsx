'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
import { MarketSummaries } from './lib/market/markets'
import { routeMarketAtom } from './lib/market/useMarket'

export default function HydrateAtoms({
  routeMarket: s_routeMarket,
}: {
  routeMarket: SuperJSONResult
}) {
  const routeMarket = deserialize(s_routeMarket) as MarketSummaries

  useHydrateAtoms([[routeMarketAtom, routeMarket]])

  return null
}
