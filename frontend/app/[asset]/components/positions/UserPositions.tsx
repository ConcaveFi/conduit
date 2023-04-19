import { cx, Skeleton } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { DEFAULT_PRICE_IMPACT, TRACKING_CODE } from 'app/[asset]/constants/perps-config'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { useMarketPrice } from 'app/[asset]/lib/price/price'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
import { abs, divide, Dnum, equal, format, from, greaterThan, mul, sub } from 'dnum'
import {
  useMarketClosePositionWithTracking,
  useMarketDataPositionDetails,
  usePrepareMarketClosePositionWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import React from 'react'
import { toBigNumber } from 'utils/toBigNumber'
import { useAccount } from 'wagmi'
import { optimism } from 'wagmi/chains'

type Position = {
  id: bigint
  lastFundingIndex: bigint
  lastPrice: Dnum
  margin: Dnum
  size: Dnum
}

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
    chainId: optimism.id,
    args: position && [toBigNumber(DEFAULT_PRICE_IMPACT), TRACKING_CODE],
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
    <div className="border-dark-30 ocean:border-blue-30 flex flex-col justify-center gap-1 overflow-hidden rounded-lg border p-2 ">
      <div className="flex gap-2">
        <div className="flex w-full flex-col gap-3">
          <PositionPerp side={side} market={market} />
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

const PositionPerp = ({
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
