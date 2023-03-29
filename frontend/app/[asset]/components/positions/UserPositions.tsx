import { cx, Skeleton } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { DEFAULT_PRICE_IMPACT, TRACKING_CODE } from 'app/[asset]/constants/perps-config'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
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
  const { address, isConnected } = useAccount()
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
      toBigNumber(DEFAULT_PRICE_IMPACT),
      TRACKING_CODE,
    ],
  })
  const { write: closePosition } = useMarketClosePositionWithTracking(config)

  const isHydrated = useIsHydrated()
  if (!isConnected) return notConnected

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
    <div className="border-dark-30 ocean:border-blue-30 flex flex-col justify-center gap-1 overflow-hidden rounded-lg border p-2  ">
      <div className="flex gap-2">
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo
            info={SideNAsset(side, market.asset)}
            value={format(market?.price || '0', { digits: 2 })}
            modifirer={side === 'SHORT' ? 'negative' : 'positive'}
          />
          <PosItemInfo info={'Size'} value={sizeFormated} />
          <PosItemInfo info={'Avg Entry'} value={format(position.lastPrice, { digits: 2 })} />
          <PosItemInfo info={'Realized P&L'} value={'-'} />
        </div>
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo
            info={'Leverage'}
            value={`${format(leverage, { digits: 2 })}x`}
            modifirer={greaterThan(leverage, 0) ? 'positive' : 'negative'}
          />
          <PosItemInfo
            info={'Unrealized P&L'}
            value={format(positionDetails.profitLoss, { digits: 2 })}
            modifirer={greaterThan(positionDetails.profitLoss, 0) ? 'positive' : 'negative'}
          />
          <PosItemInfo
            info={'Liq Price'}
            value={format(positionDetails.liquidationPrice, { digits: 2 })}
          />
          <PosItemInfo info={'Net Funding'} value={'-'} />
        </div>
      </div>
      <button
        onClick={closePosition}
        className="btn border-negative text-negative centered mt-1 h-[26px] w-full rounded-sm border-2 text-xs"
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
