import Head from 'next/head'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { useRouteMarket } from 'src/hooks/perps'
import { usePrice } from 'src/hooks/usePrice'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'

import { formatUsd } from 'src/utils/format'

function Title() {
  const market = useRouteMarket()
  const { data: priceFeed } = usePrice({ marketKey: market?.key, watch: true })

  if (!market || !priceFeed) return <title>Conduit</title>
  return (
    <Head>
      <title>
        Conduit | {market.asset} - {formatUsd(priceFeed.price)}
      </title>
    </Head>
  )
}

export default function Home() {
  const isHydrated = useIsHydrated()

  if (!isHydrated) return null
  return (
    <WidgetsProvider>
      <Title />
      <div className="skeleton flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </div>
    </WidgetsProvider>
  )
}
