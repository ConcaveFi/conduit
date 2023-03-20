'use client'

import { useEffect } from 'react'
import { format } from 'utils/format'
import { useRouteMarket } from './lib/market/useMarket'
import { useMarketPrice } from './lib/price/useOffchainPrice'

export function PageTitleWithPrice() {
  const market = useRouteMarket()

  const price = useMarketPrice({
    marketKey: market?.key,
    select: (p) => format(p, 2),
  })

  useEffect(() => {
    if (!market?.asset || !price) return
    document.title = `${market.asset} - $ ${price} | Conduit`
  }, [price, market?.asset])

  return null
}
