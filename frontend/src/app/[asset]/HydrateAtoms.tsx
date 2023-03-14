'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { Markets } from 'perps-hooks/markets'
import { MarketSummaries } from 'src/perpetuals/lib/markets'
import { routeMarketAtom } from 'src/perpetuals/hooks/useMarket'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'

export default function HydrateAtoms({
  markets: s_markets,
  routeMarket: s_routeMarket,
}: {
  markets: SuperJSONResult
  routeMarket: SuperJSONResult
}) {
  const routeMarket = deserialize(s_routeMarket) as MarketSummaries

  useHydrateAtoms([[routeMarketAtom, routeMarket]])

  return null
}
