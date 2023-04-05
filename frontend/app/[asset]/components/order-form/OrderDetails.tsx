'use client'

import { routeMarketKeyAtom, useMarketSettings } from 'app/[asset]/lib/market/useMarket'
import { useCurrentTradePreview } from 'app/[asset]/lib/useTradePreview'
import { toNumber } from 'dnum'
import { useAtomValue } from 'jotai'
import { format } from 'utils/format'
import { useMarginDetails } from './MarginDetails'
import { orderSizeUsdAtom } from './OrderFormPanel'

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

function PositionSizeIsOfBuyingPower() {
  const orderSize = useAtomValue(orderSizeUsdAtom)
  const { data: buyingPower } = useMarginDetails((m) => toNumber(m.buyingPower, 2))
  const percent = buyingPower ? ((buyingPower - orderSize) / orderSize) * 100 : 0
  return (
    <li className="odd:bg-dark-30 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Position size is {format(percent)}% of your margin</span>
    </li>
  )
}

const useTotalMargin = () => {
  const { data: remainingMargin = 0 } = useMarginDetails((m) => toNumber(m.remainingMargin, 2))
  const { data: accessibleMargin = 0 } = useMarginDetails((m) => toNumber(m.remainingMargin, 2))
  return remainingMargin + accessibleMargin
}

function LeveragedIn() {
  const orderSize = useAtomValue(orderSizeUsdAtom)
  const totalMargin = useTotalMargin()
  const leveragedIn = orderSize / totalMargin
  return (
    <li className="odd:bg-dark-30 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Leveraged in:</span>
      {leveragedIn && <span>{format(leveragedIn)}x</span>}
    </li>
  )
}

function AvailableMargin() {
  const { data: availableMargin } = useMarginDetails((m) => format(m.remainingMargin))
  return (
    <li className="odd:bg-dark-30 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Available Margin:</span>
      {availableMargin && <span>{availableMargin}</span>}
    </li>
  )
}

function MarginUsage() {
  const { data: accessibleMargin = 0 } = useMarginDetails((m) => toNumber(m.remainingMargin, 2))
  const totalMargin = useTotalMargin()
  const percent = totalMargin ? ((totalMargin - accessibleMargin) / totalMargin) * 100 : 0
  return (
    <li className="odd:bg-dark-30 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Margin Usage:</span>
      {percent && <span>{format(percent)}%</span>}
    </li>
  )
}

export function OrderDetails() {
  return (
    <ul className="text-dark-90 text-xs">
      <PositionSizeIsOfBuyingPower />
      <AvailableMargin />
      <MarginUsage />
      <EntryPrice />
      <ExecutionFee />
      <TradeFee />
      <LeveragedIn />
    </ul>
  )
}
