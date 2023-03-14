import {
  fetchMarkets,
  fetchMarketSettings,
  marketSettingsQueryKey,
  marketsQueryKey,
  MarketSummaries,
} from 'src/perpetuals/lib/markets'
import { optimism } from '@wagmi/core/chains'
import AppProviders from './providers'
import { provider } from './providers/wagmi-config'
import { dehydrate } from '@tanstack/query-core'
import HydrateAtoms from './HydrateAtoms'
import Home from '.'
import { serialize } from 'superjson'

import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'
import { notFound } from 'next/navigation'

export const revalidate = 60 // seconds

const chainId = optimism.id // always mainnet on server
const mainnetProvider = provider({ chainId })

export async function generateStaticParams() {
  const markets = await fetchMarkets({ chainId, provider: mainnetProvider })
  return markets.map((m) => ({ asset: m.asset }))
}

const getQueryClient = cache(() => new QueryClient())

const marketByAsset = (markets: MarketSummaries, asset: string) =>
  markets.find((m) => m.asset.toLowerCase() === asset.toLowerCase())

export default async function Page({ params }) {
  const markets = await fetchMarkets({ chainId, provider: mainnetProvider })

  const { asset } = params
  const routeMarket = marketByAsset(markets, asset) || markets[0] // fallback to first market

  if (!routeMarket) return notFound()

  const queryClient = getQueryClient()
  await Promise.all([
    queryClient.prefetchQuery(marketsQueryKey(chainId), () => markets),
    queryClient.prefetchQuery(marketSettingsQueryKey(routeMarket.key, chainId), () =>
      fetchMarketSettings({ marketKey: routeMarket.key, chainId, provider: mainnetProvider }),
    ),
  ])
  const dehydratedState = dehydrate(queryClient)

  // next can't serialize bigints,
  // this lib seens cool https://www.npmjs.com/package/next-superjson-plugin
  // but adding the swcPlugin breaks dev mode, TODO: circle back later
  const serializedMarkets = serialize(markets)
  const serializedRouteMarket = serialize(routeMarket)
  const serializedDehydratedState = serialize(dehydratedState)

  return (
    <>
      <HydrateAtoms markets={serializedMarkets} routeMarket={serializedRouteMarket} />
      <Home dehydratedState={serializedDehydratedState} />
    </>
  )
}
