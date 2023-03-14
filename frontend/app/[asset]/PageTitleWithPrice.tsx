'use client'

import { useEffect } from 'react'
import { format } from 'utils/format'
import { useRouteMarket } from './lib/market/useMarket'
import { useSkewAdjustedOffChainPrice } from './lib/price/useOffchainPrice'

export function PageTitleWithPrice() {
  const market = useRouteMarket()

  const price = useSkewAdjustedOffChainPrice({
    marketKey: market?.key,
    select: (p) => format(p, 4),
  })

  useEffect(() => {
    document.title = `${market.asset} - $ ${price} | Conduit`
  }, [price, market.asset])

  return null
}
