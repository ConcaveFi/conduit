import Head from 'next/head'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { WidgetsProvider } from 'src/context/WidgetsProvider'
import { useIsClientRendered } from 'src/hooks/useIsClientRendered'
import { formatUsd } from 'src/utils/format'
import { useRouteMarket } from './perps'

function Title() {
  const market = useRouteMarket()
  if (!market) return <title>Conduit</title>
  return (
    <Head>
      <title>
        Conduit | {market?.asset} - {formatUsd(market?.price)}
      </title>
    </Head>
  )
}

export default function Home() {
  const isClientRendered = useIsClientRendered()

  if (!isClientRendered) return null
  return (
    <WidgetsProvider>
      <Title />
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </div>
    </WidgetsProvider>
  )
}
