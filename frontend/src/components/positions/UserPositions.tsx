import { Table, TableBody, TableRow, THead } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import {
  useMarketDataPositionDetails,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { useIsClientRendered } from 'src/hooks/useIsClientRendered'
import { DEFAULT_PRICE_IMPACT_DELTA, TrackingCode, useRouteMarket } from 'src/pages/perps'
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
    args: market && address && [market?.key, address],
    select: parsePositionDetails,
  })
  const position = positionDetails?.position
  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market?.address,
    args: [
      BigNumber.from(position?.size.mulUnsafe(FixedNumber.from(-1)) || 0),
      DEFAULT_PRICE_IMPACT_DELTA,
      TrackingCode,
    ],
  })
  const { write: closePosition } = useMarketSubmitOffchainDelayedOrderWithTracking(config)
  const isClientRendered = useIsClientRendered()

  if (!market || !position || !isClientRendered)
    return (
      <div className="centered flex h-full ">
        <span className="text-light-400 ocean:text-ocean-300 font-medium">
          You have no positions yet.
        </span>
      </div>
    )
  const size = position.size
  const side = size.isNegative() ? 'Short' : 'Long'
  const hasPosition = !size.isZero()

  const profitLoss = positionDetails.profitLoss
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
            <span className={`text-light-600 ocean:text-white text-sm`}>{format(size)}</span>
          </td>
          <td>
            <span className={`text-light-600 ocean:text-white text-sm`}>
              {format(position?.margin)}
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
            <button className="btn btn-underline.secondary" onClick={closePosition}>
              close
            </button>
          </td>
        </tr>
      </TableBody>
    </Table>
  )
}
