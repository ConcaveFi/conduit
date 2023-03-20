import { Modal } from '@tradex/interface'
import { DEFAULT_PRICE_IMPACT_DELTA, TRACKING_CODE } from 'app/[asset]/constants/perps-config'
import {
  routeMarketKeyAtom,
  useMarketSettings,
  useRouteMarket,
} from 'app/[asset]/lib/market/useMarket'
import { routeMarketPriceAtom } from 'app/[asset]/lib/price/useOffchainPrice'
import { useCurrentTradePreview } from 'app/[asset]/lib/useTradePreview'
import { equal, format, greaterThan } from 'dnum'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import {
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { useState } from 'react'
import { toBigNumber } from 'utils/toBigNumber'
import { useMarginDetails } from './MarginDetails'
import { orderSizeUsdAtom, sizeDeltaAtom } from './OrderFormPanel'
import { sideAtom } from './SideSelector'

function ExecutionFee() {
  const marketKey = useAtomValue(routeMarketKeyAtom)
  const { data: { minKeeperFee } = {} } = useMarketSettings({ marketKey })
  return (
    <li className="odd:bg-ocean-400 flex w-full justify-between px-2 py-0.5">
      <span>Execution Fee:</span>
      {minKeeperFee && <span>$ {format(minKeeperFee)}</span>}
    </li>
  )
}

function EntryPrice() {
  const { data: entryPrice } = useCurrentTradePreview((p) => format(p.entryPrice, 2))
  return (
    <li className="odd:bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
      <span>Entry price:</span>
      {entryPrice && <span>$ {entryPrice}</span>}
    </li>
  )
}

function TradeFee() {
  const { data: fee } = useCurrentTradePreview((p) => format(p.fee, 2))
  return (
    <li className="odd:bg-ocean-400 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Trade Fee: </span>
      {fee && <span>$ {fee}</span>}
    </li>
  )
}

function OrderEntryPrice() {
  const marketPrice = useAtomValue(routeMarketPriceAtom)
  // const entryPrice = useAtomValue(orderPriceLockAtom)
  return (
    <li className="odd:bg-ocean-400 flex  w-full justify-between rounded px-2 py-0.5">
      {/* <span>Entry price: </span>
        {entryPrice && <span>$ {format(entryPrice, 2)}</span>} */}
      <span>Market price: </span>
      {marketPrice && <span>$ {format(marketPrice, 2)}</span>}
    </li>
  )
}

function OrderSummary() {
  return (
    <ul className="text-ocean-200 text-xs">
      <EntryPrice />
      <ExecutionFee />
      <TradeFee />
      <OrderEntryPrice />
    </ul>
  )
}

function ConfirmOrderDialog({ onClose }: { onClose: VoidFunction }) {
  const market = useRouteMarket()
  const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)

  const side = useAtomValue(sideAtom)

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market?.address,
    enabled: !equal(sizeDelta, 0),
    args: [toBigNumber(sizeDelta), toBigNumber(DEFAULT_PRICE_IMPACT_DELTA), TRACKING_CODE],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  return (
    <div className="bg-ocean-800 border-ocean-400 flex w-96 flex-col gap-2 rounded-xl border p-3 text-white shadow-xl">
      <span className="text-bold text-md text-center">Review your operation</span>

      <OrderSummary />

      <button
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 h-11 rounded-lg bg-teal-500 py-2 font-bold text-white shadow-lg"
        disabled={!submitOrder}
        onClick={() => submitOrder?.()}
      >
        Submit {side} order
      </button>
    </div>
  )
}

// const orderInputSave = atom<InputState>({ value: '', type: 'usd' })
const orderLockAtom = atom('unlocked', (get, set, action: 'lock' | 'unlock') => {
  if (action === 'unlock') return 'unlocked'
  return 'locked'
})

export function PlaceOrderButton() {
  const sizeUsd = useAtomValue(orderSizeUsdAtom)
  const { data: isOverBuyingPower } = useMarginDetails(
    ({ buyingPower }) => !!sizeUsd && greaterThan(sizeUsd, buyingPower),
  )

  const side = useAtomValue(sideAtom)

  let label = `Place ${side}`
  if (!sizeUsd || equal(sizeUsd, 0)) label = 'Enter an amount'
  if (isOverBuyingPower) label = 'Not enough margin'

  const disabled = !sizeUsd || equal(sizeUsd, 0) || isOverBuyingPower

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false)

  const orderLock = useSetAtom(orderLockAtom)
  const onDismiss = () => {
    orderLock('unlock')
    setConfirmationModalOpen(false)
  }

  return (
    <>
      <button
        className="btn centered bg-dark-green-gradient disabled:text-coal ocean:disabled:text-ocean-300 h-11 rounded-lg  font-bold text-white shadow-lg"
        disabled={disabled}
        onClick={() => {
          orderLock('lock')
          setConfirmationModalOpen(true)
        }}
      >
        {label}
      </button>
      <Modal isOpen={isConfirmationModalOpen} onClose={onDismiss}>
        <ConfirmOrderDialog onClose={onDismiss} />
      </Modal>
    </>
  )
}
