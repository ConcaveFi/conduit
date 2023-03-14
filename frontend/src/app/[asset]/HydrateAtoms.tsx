'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { Markets } from 'perps-hooks/markets'
import { offchainPricesAtoms } from 'src/perpetuals/hooks/useOffchainPrice'
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
  const markets = deserialize(s_markets) as MarketSummaries
  const routeMarket = deserialize(s_routeMarket) as MarketSummaries

  const network = 'mainnet' // hydrate always mainnet on server

  const offchainPrices = Object.entries(offchainPricesAtoms.mainnet).map(
    ([pythId, atom]) =>
      [
        atom,
        markets.find((m) => pythId === Markets[m.key].pythIds[network])?.price || [0n, 0],
      ] as const,
  )

  useHydrateAtoms([...offchainPrices, [routeMarketAtom, routeMarket]])

  return null
}
