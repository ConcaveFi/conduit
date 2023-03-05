import { Table, TableBody, TableRow, THead } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { BigNumber } from 'ethers'
import {
  useMarketDataPositionDetails,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { useRouteMarket } from 'src/hooks/perps'
import { DEFAULT_PRICE_IMPACT_DELTA, TrackingCode } from 'src/pages/perps'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { format, formatUsd } from 'src/utils/format'
import { useAccount } from 'wagmi'

const HEADERS = [
  'market',
  'side.place',
  'size',
  'leverage',
  'unrealized',
  'avg_entry_price',
  'liq_price',
  'close',
] as LanguageKeys[]

const MOCK_ROWS = [
  'ETH-PERP',
  'SHORT',
  '0.05 (%71.89)',
  ' 1.40 X',
  '$0.24 (0.46%)',
  ' $1,657.20',
  '$2,235.29',
] as const

const STYLES = {
  market: 'text-light-600 ocean:text-white',
  'side.place': 'text-red-500',
  size: 'text-light-600 ocean:text-white',
  leverage: 'text-light-600 ocean:text-white',
  unrealized: 'text-green-400',
  avg_entry_price: 'text-light-600 ocean:text-white',
  liq_price: 'text-light-600 ocean:text-white',
}
export function UserPositions() {
  const { address } = useAccount()
  const market = useRouteMarket()
  const { t } = useTranslation()

  const { data: positionDetails } = useMarketDataPositionDetails({
    args: [market?.market, '0x886148A6Bd2c71Db59Ab3aAD230af9F3254173Ee'],
    select: parsePositionDetails,
    enabled: !!market && !!address,
  })
  const position = positionDetails?.position
  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market?.address,
    args: position && [
      BigNumber.from(position.size).mul(-1),
      DEFAULT_PRICE_IMPACT_DELTA,
      TrackingCode,
    ],
  })
  const { write: closePosition } = useMarketSubmitOffchainDelayedOrderWithTracking(config)
  const isHydrated = useIsHydrated()
  const {} = {}

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
  const side = size.isNegative() ? 'Short' : 'Long'
  const hasPosition = !size.isZero()
  const profitLoss = positionDetails.profitLoss

  const remainingMargin = positionDetails?.remainingMargin
  const sizeUSD = size?.mulUnsafe(market?.price)
  const leverage = !remainingMargin.isZero() ? sizeUSD?.divUnsafe(remainingMargin) : undefined

  if (!hasPosition) {
    return (
      <div className="centered flex h-full ">
        <span className="text-light-400 ocean:text-ocean-300 font-medium">
          {t('you have no positions yet')}
        </span>
      </div>
    )
  }

  return (
    <Table className="w-full" left>
      <THead variant={'primary'}>
        <TableRow rows={HEADERS}>
          {(element, index) => (
            <span key={index} className="text-light-500 ocean:text-ocean-300 text-sm">
              {t(element)}
            </span>
          )}
        </TableRow>
      </THead>
      <TableBody>
        <tr>
          <td>
            <span className={`text-light-600 ocean:text-white text-sm`}>{market?.asset}</span>
          </td>
          <td>
            <span className={`${size.isNegative() ? 'text-red-400' : 'text-green-400'} text-sm`}>
              {side}
            </span>
          </td>
          <td>
            <span className={`text-light-600 ocean:text-white text-sm`}>
              {format(size, { signDisplay: 'never' })}
            </span>
          </td>
          <td>
            <span className={`text-light-600 ocean:text-white text-sm`}>
              {!!leverage && format(leverage, { signDisplay: 'never' })}
            </span>
          </td>
          <td>
            <span
              className={`${profitLoss.isNegative() ? 'text-red-400' : 'text-green-500'} text-sm`}
            >
              {formatUsd(profitLoss)}
            </span>
          </td>
          <td>
            <span className={`text-light-600 ocean:text-white text-sm`}>
              {formatUsd(position?.lastPrice)}
            </span>
          </td>
          <td>
            <span className={`text-light-600 ocean:text-white text-sm`}>
              {formatUsd(positionDetails.liquidationPrice)}
            </span>
          </td>
          <td>
            <button className="btn btn-underline.secondary" onClick={closePosition}>
              close
            </button>
          </td>
        </tr>
      </TableBody>
    </Table>
  )
}
