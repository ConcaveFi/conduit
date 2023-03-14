'use client'

// import { useRouteMarket } from 'src/perpetuals/hooks/useMarket'
// import { useSkewAdjustedOffChainPrice } from 'src/perpetuals/hooks/useOffchainPrice'
import { useIsHydrated } from './providers/IsHydratedProvider'

// import Head from 'next/head'
import { GridLayout } from 'src/components/futures/GridLayout'
import { Topbar } from 'src/components/futures/topbar/Topbar'
import { StrategyHeader } from 'src/perpetuals/Header'
import { WidgetsProvider } from './providers/WidgetsProvider'
import { Hydrate } from '@tanstack/react-query'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
// import { format } from 'dnum'

// function Title() {
//   const market = useRouteMarket()

//   const price = useSkewAdjustedOffChainPrice({
//     marketKey: market?.key,
//     select: (p) => format(p, 2),
//   })

//   return (
//     <Head>
//       <title>{market && price ? `${market.asset} - $ ${price} | Conduit` : 'Conduit'}</title>
//     </Head>
//   )
// }

export default function Home({ dehydratedState }: { dehydratedState: SuperJSONResult }) {
  const state = deserialize(dehydratedState)

  // const isHydrated = useIsHydrated()
  // if (!isHydrated) return null

  return (
    <Hydrate state={state}>
      <WidgetsProvider>
        {/* <Title /> */}
        <StrategyHeader />
        <GridLayout />
      </WidgetsProvider>
    </Hydrate>
  )
}
