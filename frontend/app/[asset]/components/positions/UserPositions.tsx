import { cx, Skeleton } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
import { DEFAULT_PRICE_IMPACT_DELTA, TRACKING_CODE } from 'app/[asset]/constants/perps-config'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { abs, divide, equal, format, from, greaterThan } from 'dnum'
import {
  useMarketClosePositionWithTracking,
  useMarketDataPositionDetails,
  usePrepareMarketClosePositionWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import React from 'react'
import { toBigNumber } from 'utils/toBigNumber'
import { useAccount } from 'wagmi'

export function UserPositions() {
  const { address } = useAccount()
  const market = useRouteMarket()
  const { t } = useTranslation()

  const { data: positionDetails } = useMarketDataPositionDetails({
    args: market && address && [market.address, address],
    select: parsePositionDetails,
    enabled: !!market && !!address,
  })
  const position = positionDetails?.position
  const { config } = usePrepareMarketClosePositionWithTracking({
    address: market?.address,
    args: position && [
      // BigNumber.from(position.size).mul(-1),
      toBigNumber(DEFAULT_PRICE_IMPACT_DELTA),
      TRACKING_CODE,
    ],
  })
  const { write: closePosition } = useMarketClosePositionWithTracking(config)

  const isHydrated = useIsHydrated()
  if (!market || !position || !isHydrated)
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

  if (!hasPosition) {
    return (
      <div className="centered flex h-full ">
        <span className="text-light-400 ocean:text-ocean-300 text-sm font-medium">
          {t('you have no positions yet')}
        </span>
      </div>
    )
  }

  const profitLoss = positionDetails.profitLoss

  const remainingMargin = positionDetails.remainingMargin

  const leverage = !equal(remainingMargin, 0)
    ? divide(positionDetails.notionalValue, remainingMargin)
    : from([0n, 0])

  const sizeFormated = `${format(abs(size))} ($ ${format(abs(positionDetails.notionalValue))})`

  return (
    <div className="border-dark-30 ocean:border-blue-30 flex flex-col justify-center gap-4 overflow-hidden rounded-lg border-2 p-4  ">
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo info={SideNAsset(side, market.asset)} value={format(market?.price || '0')} />
          <PosItemInfo info={'Size'} value={sizeFormated} />
          <PosItemInfo info={'Avg Entry'} value={format(position.lastPrice)} />
          <PosItemInfo info={'Realized P&L'} value={'-'} />
        </div>
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo info={'Unrealized P&L'} value={format(positionDetails.profitLoss)} />
          <PosItemInfo info={'Liq Price'} value={format(positionDetails.liquidationPrice)} />
          <PosItemInfo info={'Net Funding'} value={'-'} />
          <PosItemInfo info={'Leverage'} value={format(leverage)} />
        </div>
      </div>
      <button
        onClick={closePosition}
        className="btn border-negative text-negative centered h-12 w-full rounded-lg border-2"
      >
        Close position
      </button>
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

function PosItemInfo(props: {
  info: string | JSX.Element
  modifirer?: 'positive' | 'negative'
  value: string
}) {
  const { modifirer, info, value } = props
  return (
    <div className="bg-dark-30 ocean:bg-blue-30 flex h-8 w-full  items-center justify-between rounded-md px-2">
      <span className="font-medium text-white">{info}</span>
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
