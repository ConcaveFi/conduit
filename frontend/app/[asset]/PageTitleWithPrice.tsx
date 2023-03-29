'use client'

import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { format } from 'utils/format'
import { routeMarketKeyAtom } from './lib/market/useMarket'
import { routeMarketPriceAtom } from './lib/price/price'

const formattedMarketPrice = selectAtom(routeMarketPriceAtom, (p) => format(p, 2))

export function PageTitleWithPrice() {
  const asset = useAtomValue(routeMarketKeyAtom)
  const price = useAtomValue(formattedMarketPrice)

  useEffect(() => {
    if (!asset || !price) return
    document.title = `${asset} - $ ${price} | Conduit`
  }, [price, asset])

  return null
}
