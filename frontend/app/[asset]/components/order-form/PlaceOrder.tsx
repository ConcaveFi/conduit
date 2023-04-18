'use client'

import { useAddRecentTransaction } from '@pcnv/txs-react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Modal, cx } from '@tradex/interface'
import { DEFAULT_PRICE_IMPACT, TRACKING_CODE } from 'app/[asset]/constants/perps-config'
import { MarketSummary } from 'app/[asset]/lib/market/markets'
import { routeMarketAtom, useMarketSettings } from 'app/[asset]/lib/market/useMarket'
import { useMarketPrice } from 'app/[asset]/lib/price/price'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { useTradePreview } from 'app/[asset]/lib/useTradePreview'
import { Dnum, abs, equal, greaterThan, multiply } from 'dnum'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import {
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { format } from 'utils/format'
import { toBigNumber } from 'utils/toBigNumber'
import { useAccount, useNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { useMarginDetails } from './MarginDetails'
import { orderSizeUsdAtom, sizeDeltaAtom } from './OrderFormPanel'
import { sideAtom } from './SideSelector'

function ExecutionFee({ marketKey }: { marketKey: MarketKey }) {
  const { data: { minKeeperFee } = {} } = useMarketSettings({ marketKey })
  return (
    <li className="odd:bg-ocean-400 flex w-full justify-between px-2 py-0.5">
      <span>Execution Fee:</span>
      {minKeeperFee && <span>$ {format(minKeeperFee)}</span>}
    </li>
  )
}

function IndexPrice({ marketKey }: { marketKey: MarketKey }) {
  const marketPrice = useMarketPrice({ marketKey })
  return (
    <li className="odd:bg-ocean-400 flex  w-full justify-between rounded px-2 py-0.5">
      <span>Current market price: </span>
      {marketPrice && <span>$ {format(marketPrice, 2)}</span>}
    </li>
  )
}

function NotionalValue({ size, marketKey }: { size: Dnum; marketKey: MarketKey }) {
  const marketPrice = useMarketPrice({ marketKey })
  const notionalValue = multiply(size, marketPrice)
  return <span className="text-dark-30 ocean:text-blue-30">($ {format(notionalValue, 2)})</span>
}

function OrderSummary({ order }: { order: Order }) {
  const { data: preview } = useTradePreview({
    market: order.market.address,
    sizeDelta: order.sizeDelta,
  })
  const size = abs(order.sizeDelta)
  return (
    <ul className="text-ocean-200 text-xs">
      <IndexPrice marketKey={order.market.key} />
      <li className="odd:bg-ocean-400 flex  w-full justify-between rounded px-2 py-0.5">
        <span>Order size: </span>
        <span>
          {format(size)} {order.market.asset}{' '}
          <NotionalValue size={size} marketKey={order.market.key} />
        </span>
      </li>
      <ExecutionFee marketKey={order.market.key} />
      <li className="odd:bg-ocean-400 flex  w-full justify-between rounded px-2 py-0.5">
        <span>Trade Fee: </span>
        {preview?.fee && <span>$ {format(preview.fee)}</span>}
      </li>
    </ul>
  )
}

type Order = { market: MarketSummary; sizeDelta: Dnum; side: 'long' | 'short' }

function ConfirmOrderDialog({ onClose, order }: { order: Order; onClose: VoidFunction }) {
  const registerTransaction = useAddRecentTransaction()

  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: order.market.address,
    enabled: !equal(order.sizeDelta, 0),
    chainId,
    args: [toBigNumber(order.sizeDelta), toBigNumber(DEFAULT_PRICE_IMPACT), TRACKING_CODE],
  })
  const {
    write: submitOrder,
    isIdle,
    isLoading,
  } = useMarketSubmitOffchainDelayedOrderWithTracking({
    ...config,
    onSuccess: (tx) => {
      onClose()
      registerTransaction({
        hash: tx.hash,
        meta: {
          description: `Open ${order.side} ${order.market.asset} position`,
        },
      })
    },
  })

  return (
    <div className="bg-dark-20 border-dark-10 ocean:bg-blue-30 ocean:border-blue-20 flex w-96 flex-col gap-2 rounded-xl border p-3 text-white shadow-xl">
      <span className="text-bold text-md text-center">Review your operation</span>

      <OrderSummary order={order} />

      <button
        className="btn disabled:bg-dark-30 ocean:disabled:bg-blue-30 centered h-11 rounded-lg bg-teal-500 py-2 font-bold text-white shadow-lg"
        disabled={!submitOrder || !isIdle}
        onClick={() => submitOrder?.()}
      >
        {isLoading ? `Confirm in your wallet` : `Submit ${order.side} order`}
      </button>
    </div>
  )
}

const orderToBeConfirmedAtom = atom<Order | undefined>(undefined)
const confirmOrderAtom = atom(null, (get, set, action: 'ask' | 'dismiss') => {
  if (action === 'dismiss') {
    set(orderToBeConfirmedAtom, undefined)
    return
  }

  const market = get(routeMarketAtom).data
  if (!market) return set(orderToBeConfirmedAtom, undefined)

  set(orderToBeConfirmedAtom, {
    market,
    side: get(sideAtom),
    sizeDelta: get(sizeDeltaAtom.currentValueAtom),
  })
})

export function PlaceOrderButton() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const sizeUsd = useAtomValue(orderSizeUsdAtom)
  const { data: hasEnoughMargin } = useMarginDetails(
    (m) => greaterThan(m.remainingMargin, 50) && !!sizeUsd && greaterThan(sizeUsd, m.buyingPower),
  )

  const side = useAtomValue(sideAtom)

  let label = `Place ${side}`
  if (!sizeUsd || equal(sizeUsd, 0)) label = 'Enter an amount'
  if (!hasEnoughMargin) label = 'Not enough margin'
  if (!isConnected) label = 'Connect to continue'

  const disabled = isConnected && (!sizeUsd || equal(sizeUsd, 0) || !hasEnoughMargin)

  const order = useAtomValue(orderToBeConfirmedAtom)
  const orderConfirmation = useSetAtom(confirmOrderAtom)
  const onDismiss = () => orderConfirmation('dismiss')

  return (
    <>
      <button
        className={cx(
          'btn centered h-11 rounded-lg py-2 font-bold text-white shadow-lg',
          'disabled:bg-dark-30 ocean:disabled:bg-blue-30 disabled:text-dark-20 ocean:disabled:text-blue-20',
          disabled ? '' : 'bg-dark-green-gradient',
        )}
        disabled={disabled}
        onClick={() => (isConnected ? orderConfirmation('ask') : openConnectModal?.())}
      >
        {label}
      </button>
      <Modal isOpen={!!order} onClose={onDismiss}>
        {order && <ConfirmOrderDialog order={order} onClose={onDismiss} />}
      </Modal>
    </>
  )
}
