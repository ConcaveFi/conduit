import { cx } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { FixedNumber } from 'ethers'
import {
  useMarketClosePositionWithTracking,
  useMarketDataPositionDetails,
  usePrepareMarketClosePositionWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { DEFAULT_PRICE_IMPACT_DELTA, TrackingCode } from 'src/constants/perps-config'
import { useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { format, formatUsd } from 'src/utils/format'
import { useAccount } from 'wagmi'

export function UserPositions() {
  const { address } = useAccount()
  const market = useRouteMarket()
  const { t } = useTranslation()

  const { data: positionDetails } = useMarketDataPositionDetails({
    args: market && address && [market?.address, address],
    select: parsePositionDetails,
    enabled: !!market && !!address,
  })
  const position = positionDetails?.position
  const { config } = usePrepareMarketClosePositionWithTracking({
    address: market?.address,
    args: position && [
      // BigNumber.from(position.size).mul(-1),
      DEFAULT_PRICE_IMPACT_DELTA,
      TrackingCode,
    ],
  })
  const { write: closePosition } = useMarketClosePositionWithTracking(config)

  const isHydrated = useIsHydrated()
  if (!market || !position || !isHydrated)
    return (
      <div className="centered flex h-6 w-full gap-4">
        <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-600 h-full w-full bg-white"></div>
        <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-600 h-full w-full bg-white"></div>
        <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-600 h-full w-full bg-white"></div>
        <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-600 h-full w-full bg-white"></div>
      </div>
    )

  const size = position.size
  const side = (size.isNegative() ? 'Short' : 'Long').toUpperCase()
  const hasPosition = !size.isZero()
  const profitLoss = positionDetails.profitLoss

  const remainingMargin = positionDetails?.remainingMargin
  const sizeUSD = size?.mulUnsafe(market?.price)
  const leverage = !remainingMargin.isZero()
    ? sizeUSD?.divUnsafe(remainingMargin)
    : FixedNumber.from(0)

  if (!hasPosition) {
    return (
      <div className="centered flex h-full ">
        <span className="text-light-400 ocean:text-ocean-300 font-medium">
          {t('you have no positions yet')}
        </span>
      </div>
    )
  }

  const sizeFormated = `${format(size, { signDisplay: 'never' })} (${formatUsd(sizeUSD, {
    signDisplay: 'never',
  })})`

  return (
    <div className="border-ocean-400 flex flex-col justify-center gap-4 overflow-hidden rounded-lg border-2 p-4  ">
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo info={[SideNAsset(side, market.asset), formatUsd(market?.price || '0')]} />
          <PosItemInfo info={['Size', sizeFormated]} />
          <PosItemInfo info={['Avg Entry', format(position.lastPrice)]} />
          <PosItemInfo info={['Realized P&L', '-']} />
        </div>
        <div className="flex w-full flex-col gap-3">
          <PosItemInfo info={['Unrealized P&L', '-']} />
          <PosItemInfo info={['Liq Price', format(positionDetails.liquidationPrice)]} />
          <PosItemInfo info={['Net Funding', '-']} />
          <PosItemInfo info={['Leverage', format(leverage, { signDisplay: 'never' })]} />
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
    <>
      <span className={cx(side === 'SHORT' ? 'text-negative' : 'text-positive')}>{side}</span>{' '}
      {asset}
    </>
  )
}

function PosItemInfo(props: {
  info: [string | JSX.Element, string]
  modifirer?: 'positive' | 'negative'
}) {
  const { modifirer, info } = props
  return (
    <div className="bg-ocean-500 flex h-8 w-full  items-center justify-between rounded-md px-2">
      <span className="font-medium text-white">{info[0]}</span>
      <span
        className={cx(
          modifirer ? (modifirer === 'positive' ? 'text-positive' : 'text-negative') : 'text-white',
        )}
      >
        {info[1]}
      </span>
    </div>
  )
}