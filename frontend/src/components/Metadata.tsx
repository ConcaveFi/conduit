import { FixedNumber } from 'ethers'
import Head from 'next/head'
import { useMarketSettings, useRouteMarket } from 'src/hooks/perps'
import { useOffchainPrice } from 'src/hooks/usePrice'

import { formatUsd } from 'src/utils/format'

function Title() {
  const market = useRouteMarket()
  const { data: settings } = useMarketSettings({ marketKey: market?.key })
  const { data: skewAdjustedPrice } = useOffchainPrice({
    marketKey: market?.key,
    watch: true,
    select: ({ price }) => {
      if (!market || !settings) return price
      const skew = FixedNumber.fromValue(market.marketSkew.div(settings.skewScale).add(1))
      const skewAdjustedPrice = price.mulUnsafe(skew)
      return skewAdjustedPrice
    },
  })

  if (!market || !skewAdjustedPrice || !settings) return <title>Conduit</title>

  return (
    <title>
      {market.asset} - {formatUsd(skewAdjustedPrice)} | Conduit
    </title>
  )
}

export function Metadata() {
  return (
    <Head>
      <Title />
    </Head>
  )
}
