import { Tab } from '@headlessui/react'
import { Panel, PanelProps } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import {
  useMarketPositions,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { parsePosition } from 'perps-hooks/parsers'
import { forwardRef } from 'react'
import { useIsClientRendered } from 'src/hooks/useIsClientRendered'
import { DEFAULT_PRICE_IMPACT_DELTA, TrackingCode, useRouteMarket } from 'src/pages/perps'
import { useAccount } from 'wagmi'

// CONSTANTS -------------------------------------------------------------------

const TABS = ['trade', 'charts', 'trading_history', 'activity_log'] as LanguageKeys[]
const HEADERS = [
  'market',
  'side.place',
  'size',
  'leverage',
  'unrealized',
  'avg_entry_price',
  'liq_price',
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
  market: '<text-light-6></text-light-6>00 ocean:text-white',
  'side.place': 'text-red-500',
  size: '<text-light-6></text-light-6>00 ocean:text-white',
  leverage: '<text-light-6></text-light-6>00 ocean:text-white',
  unrealized: 'text-green-400',
  avg_entry_price: '<text-light-6></text-light-6>00 ocean:text-white',
  liq_price: '<text-light-6></text-light-6>00 ocean:text-white',
}

// COMPONENT ---------------------------------------------------------------------

export const ViewPanels = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { address } = useAccount()
  const market = useRouteMarket()
  const { t } = useTranslation()

  const { data: position } = useMarketPositions({
    args: address && [address],
    address: market && market.address,
    select: parsePosition,
  })
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

  if (!market || !position || !isClientRendered) return null
  const size = position.size
  const priceChange = market.price.subUnsafe(position.lastPrice)
  const side = size.isNegative() ? 'Short' : 'Long'
  const hasPosition = !size.isZero()
  const profitLoss = size.mulUnsafe(priceChange)

  return (
    <Tab.Group>
      <Panel {...props} variant="secondary" ref={ref} headerChild={<Tabs />}>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Panel>
    </Tab.Group>
  )
})

const Tabs = () => {
  const { t } = useTranslation()
  return (
    <Tab.List>
      {TABS.map((tab) => {
        return (
          <Tab key={tab} className="outline-none">
            {({ selected }) => (
              <span
                className={`btn px-4 py-[2px] outline-none ring-0
                ${selected ? 'btn-secondary' : 'btn-underline.secondary'} `}
              >
                {/* {t(tab)} */}
                {tab}
              </span>
            )}
          </Tab>
        )
      })}
    </Tab.List>
  )
}
