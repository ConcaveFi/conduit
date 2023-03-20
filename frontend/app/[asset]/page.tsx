import { dehydrate } from '@tanstack/query-core'
import { optimism } from '@wagmi/core/chains'
import { serialize } from 'superjson'
import { WidgetsProvider } from '../providers/WidgetsProvider'
import { GridLayout } from './components/GridLayout'
import { StrategyHeader } from './components/Header'
import ReactQueryHydrate, { HydrateAtoms, JotaiProvider } from './HydrateProviders'
import { fetchMarketSettings, marketSettingsQueryKey, MarketSummaries } from './lib/market/markets'
import { getAllMarkets, getProvider, getQueryClient } from './server-only'

export async function generateStaticParams() {
  const markets = await getAllMarkets(optimism.id)
  return markets.map((m) => ({ asset: m.asset }))
}

const getRouteMarket = async (asset: string) => {
  const markets = await getAllMarkets(optimism.id)
  return marketByAsset(markets, asset) || markets[0] // fallback to first market
}

const marketByAsset = (markets: MarketSummaries, asset: string) =>
  markets.find((m) => m.asset.toLowerCase() === asset.toLowerCase())

export default async function Page({ params }) {
  const market = await getRouteMarket(params.asset)
  if (!market) throw 'wtf'

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(marketSettingsQueryKey(market.key, optimism.id), () =>
    fetchMarketSettings({
      marketKey: market.key,
      chainId: optimism.id,
      provider: getProvider(optimism.id),
    }),
  )

  // next can't serialize bigints,
  // this lib seens cool https://www.npmjs.com/package/next-superjson-plugin
  // but adding the swcPlugin breaks dev mode, TODO: circle back later
  const serializedRouteMarket = serialize(market)
  const dehydratedState = dehydrate(queryClient)
  const serializedDehydratedState = serialize(dehydratedState)

  return (
    <ReactQueryHydrate dehydratedState={serializedDehydratedState}>
      <JotaiProvider>
        <HydrateAtoms routeMarket={serializedRouteMarket} />
        <StrategyHeader />
        <WidgetsProvider>
          <GridLayout />
        </WidgetsProvider>
      </JotaiProvider>
    </ReactQueryHydrate>
  )
}
