'use client'

import { routeMarketKeyAtom, useMarketSettings } from 'app/[asset]/lib/market/useMarket'
import { useCurrentTradePreview } from 'app/[asset]/lib/useTradePreview'
import { useAtomValue } from 'jotai'
import { format } from 'utils/format'

function ExecutionFee() {
  const marketKey = useAtomValue(routeMarketKeyAtom)
  const { data: { minKeeperFee } = {} } = useMarketSettings({ marketKey })
  return (
    <li className="odd:bg-dark-30 flex w-full justify-between px-2 py-0.5">
      <span>Execution Fee:</span>
      {minKeeperFee && <span>$ {format(minKeeperFee)}</span>}
    </li>
  )
}

function EntryPrice() {
  const { data: entryPrice } = useCurrentTradePreview((p) => format(p.entryPrice, 2))
  return (
    <li className="odd:bg-dark-30 flex w-full justify-between rounded px-2 py-0.5">
      <span>Entry price:</span>
      {entryPrice && <span>$ {entryPrice}</span>}
    </li>
  )
}

function TradeFee() {
  const { data: fee } = useCurrentTradePreview((p) => format(p.fee, 2))
  return (
    <li className="odd:bg-dark-30 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Trade Fee: </span>
      {fee && <span>$ {fee}</span>}
    </li>
  )
}

export function OrderDetails() {
  return (
    <ul className="text-dark-90 text-xs">
      <EntryPrice />
      <ExecutionFee />
      <TradeFee />
    </ul>
  )
}
