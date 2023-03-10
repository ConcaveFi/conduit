import { useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { useSkewAdjustedOffChainPrice } from 'src/perpetuals/hooks/useOffchainPrice'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'

import Head from 'next/head'
import { GridLayout } from 'src/components/futures/GridLayout'
import { Topbar } from 'src/components/futures/topbar/Topbar'
import { StrategyHeader } from 'src/perpetuals/Header'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'
import { formatUsd } from 'src/utils/format'

function Title() {
  const market = useRouteMarket()

  const { data: price } = useSkewAdjustedOffChainPrice({ marketKey: market?.key })

  return (
    <Head>
      <title>
        {market && price ? `${market.asset} - ${formatUsd(price)} | Conduit` : 'Conduit'}
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
