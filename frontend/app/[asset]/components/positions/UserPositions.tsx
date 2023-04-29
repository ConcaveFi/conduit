import { useAddRecentTransaction, useRecentTransactions } from '@pcnv/txs-react'
import { DefaultToastTransactionMeta } from '@pcnv/txs-react/dist/toasts/ToastsViewport'
import { Spinner } from '@tradex/icons'
import { Modal, Skeleton, cx } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { TRACKING_CODE, calculatePriceImpact } from 'app/[asset]/constants/perps-config'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { useMarketPrice } from 'app/[asset]/lib/price/price'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
import { Dnum, abs, divide, equal, format, from, greaterThan, mul, sub } from 'dnum'
import { useDisclosure } from 'hooks/useDisclosure'
import {
  useMarketCancelOffchainDelayedOrder,
  useMarketDataPositionDetails,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketCancelOffchainDelayedOrder,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import React, { useEffect, useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { toBigNumber } from 'utils/toBigNumber'
import { deepEqual, useAccount } from 'wagmi'

type Position = {
  id: bigint
  lastFundingIndex: bigint
  lastPrice: Dnum
  margin: Dnum
  size: Dnum
}

export const useOffchaintransactions = (timeToWait = 42_000) => {
  const tradeHistory = useRecentTransactions()
  const [now, setNow] = useState(Date.now())
  useInterval(() => setNow(Date.now()), 1000)

  const offchainTrades = useMemo(() => {
    return tradeHistory.filter((t) => {
      return t.status !== 'failed' && t.meta['method'] === 'submitOffchainDelayedOrderWithTracking'
    })
  }, [tradeHistory])
  const pendingTrade = useMemo(() => {
    return offchainTrades.find((t) => {
      return t.sentAt > now - timeToWait
    })
  }, [offchainTrades, now])

  const percent = useMemo(() => {
    if (!pendingTrade) return 0
    const waitedTimeInMs = now - (pendingTrade?.sentAt || 0)
    return Math.round((waitedTimeInMs / timeToWait) * 100)
  }, [now, pendingTrade])

  return {
    timeToWait,
    percent,
    pendingTrade,
    offchainTrades,
  }
}

export const ProgresBar = React.memo(({ percent }: { percent: number }) => {
  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className=" h-2.5 rounded-full bg-blue-600 transition-all duration-1000 ease-linear"
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  )
}, deepEqual)

export const PostitionPendingBar = () => {
  const { pendingTrade, percent } = useOffchaintransactions()

  if (!pendingTrade) return <></>
  return <ProgresBar percent={percent} />
}

export function UserPositions() {
  const { address, isConnected } = useAccount()
  const market = useRouteMarket()
  const { t } = useTranslation()
  const { pendingTrade } = useOffchaintransactions()
  const isHydrated = useIsHydrated()

  const marketDataPosition = useMarketDataPositionDetails({
    args: market && address && [market.address, address],
    select: parsePositionDetails,
    enabled: !!market && !!address,
  })

  useEffect(() => {
    marketDataPosition.refetch()
  }, [pendingTrade, marketDataPosition.refetch])
  if (!isConnected) return notConnected

  const positionDetails = marketDataPosition.data
  const position = positionDetails?.position

  if (!market || !position || !isHydrated || marketDataPosition.isFetching)
    return (
      <div className="centered flex h-6 w-full gap-4">
        <Skeleton className="h-full w-full "></Skeleton>
        <Skeleton className="h-full w-full "></Skeleton>
        <Skeleton className="h-full w-full "></Skeleton>
        <Skeleton className="h-full w-full "></Skeleton>
      </div>
    )

  const size = position.size
  const side = (greaterThan(size, 0) ? 'Long' : 'Short').toUpperCase()
  const hasPosition = !equal(size, 0)

  if (!hasPosition && pendingTrade) {
    return (
      <div className="border-dark-30 ocean:border-blue-30 flex flex-col justify-center gap-1 overflow-hidden rounded-lg border p-2 ">
        <div className="flex gap-2">
          <div className="flex w-full flex-col gap-3">
            <PostitionPendingBar />
          </div>
        </div>
      </div>
    )
  }

  if (!hasPosition) {
    return (
      <div className="centered flex h-full ">
        <span className="text-dark-accent ocean:text-blue-accent text-sm font-medium">
          {t('you have no positions yet')}
        </span>
      </div>
    )
  }

  const remainingMargin = positionDetails.remainingMargin
  const leverage = !equal(remainingMargin, 0)
    ? divide(positionDetails.notionalValue, remainingMargin)
    : from([0n, 0])

  const sizeFormated = `${format(abs(size), { digits: 2 })} ($ ${format(
    abs(positionDetails.notionalValue),
    { digits: 2 },
  )})`

  return (
    <div className="border-dark-30 ocean:border-blue-30 flex flex-col justify-center gap-2 overflow-hidden rounded-lg border p-2 ">
      <div className="flex gap-2">
        <div className="flex w-full flex-col gap-3">
          <PositionMarketPrice side={side} market={market} />
          <PosItemInfo info={'Size'} value={sizeFormated} />
          <PosItemInfo info={'Avg Entry'} value={format(position.lastPrice, { digits: 2 })} />
        </div>
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo
            info={'Leverage'}
            value={`${format(leverage, { digits: 2 })}x`}
            modifirer={greaterThan(leverage, 0) ? 'positive' : 'negative'}
          />
          <PositionPL market={market} position={position} />
          <PosItemInfo
            info={'Liq Price'}
            value={format(positionDetails.liquidationPrice, { digits: 2 })}
          />
        </div>
      </div>
      {!pendingTrade && <ClosePositionButton position={position} />}
      <PostitionPendingBar />
    </div>
  )
}
function SideNAsset(side: string, asset: string) {
  return (
    <React.Fragment>
      <span className={cx(side === 'SHORT' ? 'text-negative' : 'text-positive')}>{side}</span>{' '}
      {asset}
    </React.Fragment>
  )
}

const ConfirmClosePosition = ({
  price,
  position,
  onClose,
}: {
  price: Dnum
  position: Position
  onClose: VoidFunction
}) => {
  const registerTx = useAddRecentTransaction<
    DefaultToastTransactionMeta & { method: string; args: string[] }
  >()
  const market = useRouteMarket()
  const account = useAccount()

  const currentPositionSizeDelta = toBigNumber(position?.size || [0n, 18])
  const closePositionsizeDelta = currentPositionSizeDelta.mul(-1)
  const priceImpact = useMemo(
    () => calculatePriceImpact(closePositionsizeDelta, toBigNumber(price || [0n, 18])),
    [price, closePositionsizeDelta],
  )
  const prepareClose = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market?.address,
    args: [closePositionsizeDelta, priceImpact, TRACKING_CODE],
  })
  const closePosition = useMarketSubmitOffchainDelayedOrderWithTracking({
    ...prepareClose.config,
    onSuccess({ hash }) {
      const meta = {
        description: `Close position for ${market?.asset}.`,
        method: 'submitOffchainDelayedOrderWithTracking',
        args: [closePositionsizeDelta, priceImpact, TRACKING_CODE].map((i) => '' + i),
      }
      registerTx({ hash, meta })
    },
  })

  const reason =
    prepareClose.error && 'reason' in prepareClose.error
      ? (prepareClose.error.reason as string).replace('execution reverted: ', '')
      : ''

  const prepareCancel = usePrepareMarketCancelOffchainDelayedOrder({
    address: market?.address,
    args: account.address && [account.address],
    enabled: !!account.address && !!reason,
  })
  const cancel = useMarketCancelOffchainDelayedOrder({
    ...prepareCancel.config,
  })
  if (reason === 'previous order exists') {
    return (
      <div className="bg-dark-20 border-dark-10 ocean:bg-blue-30 ocean:border-blue-20 flex w-96 flex-col gap-2 rounded-xl border p-3 text-white shadow-xl">
        <span className="text-bold text-md text-center">Review your operation</span>
        <span className="text-bold text-center text-sm">Previous order failed, cancel it</span>
        {prepareCancel.isSuccess && (
          <button
            onClick={cancel.write}
            className="btn disabled:bg-dark-30 ocean:disabled:bg-blue-30 centered h-11 rounded-lg bg-teal-500 py-2 font-bold text-white shadow-lg"
          >
            Cancel previous
          </button>
        )}
      </div>
    )
  }
  console.log(reason)
  return (
    <div className="bg-dark-20 border-dark-10 ocean:bg-blue-30 ocean:border-blue-20 flex w-96 flex-col gap-2 rounded-xl border p-3 text-white shadow-xl">
      <span className="text-bold text-md text-center">Review your operation</span>
      <span className="text-bold text-center text-sm">Close currently position</span>
      {prepareClose.isLoading && (
        <button
          disabled={true}
          className="btn disabled:bg-dark-30 ocean:disabled:bg-blue-30 centered h-11 rounded-lg bg-teal-500 py-2 font-bold text-white shadow-lg"
        >
          <Spinner />
        </button>
      )}
      {prepareClose.isError && (
        <button
          onClick={() => {
            prepareClose.refetch()
          }}
          className="btn disabled:bg-dark-30 ocean:disabled:bg-blue-30 centered h-11 rounded-lg bg-teal-500 py-2 font-bold text-white shadow-lg"
        >
          {reason}, try again
        </button>
      )}
      {prepareClose.isSuccess && (
        <button
          onClick={() => {
            closePosition.write?.()
            onClose()
          }}
          className="btn disabled:bg-dark-30 ocean:disabled:bg-blue-30 centered h-11 rounded-lg bg-teal-500 py-2 font-bold text-white shadow-lg"
        >
          Close position
        </button>
      )}
    </div>
  )
}
const ClosePositionButton = ({ position }: { position: any }) => {
  const market = useRouteMarket()
  const price = useMarketPrice({ marketKey: market?.key })
  const confirmModal = useDisclosure()
  const [selectedPrice, setSelectedPrice] = useState(price)
  return (
    <>
      <button
        onClick={() => {
          setSelectedPrice(price)
          confirmModal.onOpen()
        }}
        className="btn border-negative text-negative centered mt-1 h-[26px] w-full rounded-sm border-2 text-xs"
      >
        Close position
      </button>
      <Modal {...confirmModal}>
        <ConfirmClosePosition
          onClose={confirmModal.onClose}
          position={position}
          price={selectedPrice}
        />
      </Modal>
    </>
  )
}

const PositionMarketPrice = ({
  side,
  market,
}: {
  side: string
  market: { asset: string; key: MarketKey }
}) => {
  const price = useMarketPrice({ marketKey: market?.key })
  return (
    <PosItemInfo
      info={SideNAsset(side, market.asset)}
      value={format(price || '0', { digits: 2 })}
      modifirer={side === 'SHORT' ? 'negative' : 'positive'}
    />
  )
}
const PositionPL = ({
  market,
  position,
}: {
  market: { asset: string; key: MarketKey }
  position: Position
}) => {
  const price = useMarketPrice({ marketKey: market?.key })
  const profit = mul(sub(price, position?.lastPrice), position.size)
  return (
    <PosItemInfo
      info={'Unrealized P&L'}
      value={format(profit, { digits: 2 })}
      modifirer={greaterThan(profit, 0) ? 'positive' : 'negative'}
    />
  )
}

function PosItemInfo(props: {
  info: string | JSX.Element
  modifirer?: 'positive' | 'negative'
  value: string
}) {
  const { modifirer, info, value } = props
  return (
    <div className="bg-dark-30 ocean:bg-blue-30 flex h-[22px] w-full items-center justify-between rounded-sm px-2 text-xs font-light">
      <span className="text-white">{info}</span>
      <span
        className={cx(
          modifirer ? (modifirer === 'positive' ? 'text-positive' : 'text-negative') : 'text-white',
        )}
      >
        {value}
      </span>
    </div>
  )
}

const notConnected = (
  <div className="centered flex h-full ">
    <span className="text-dark-accent ocean:text-blue-accent text-sm font-medium">
      Connect your wallet to see your positions
    </span>
  </div>
)
