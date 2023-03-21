import { Panel, PanelProps } from '@tradex/interface'
import { from, multiply, toNumber } from 'dnum'
import { selectAtom } from 'jotai/utils'
import { forwardRef } from 'react'
import atomWithDebounce from 'utils/atom-utils'
import { DepositMarginToReduceRisk } from './DepositMarginToReduceRisk'
import { LiquidationInfo } from './LiquidationInfo'
import { MarginDetails } from './MarginDetails'
import { OrderDetails } from './OrderDetails'
import { OrderSizeInput, orderDerivedValuesAtom } from './OrderSizeInput'
import { PlaceOrderButton } from './PlaceOrderButton'
import { SideSelector, sideAtom } from './SideSelector'
import { TransferMarginButton } from './TransferMargin'

export const orderSizeUsdAtom = selectAtom(orderDerivedValuesAtom, ({ usd }) =>
  toNumber(usd || [0n, 0], 2),
)

export const sizeDeltaAtom = atomWithDebounce((get) => {
  const side = get(sideAtom)
  const assetInput = get(selectAtom(orderDerivedValuesAtom, ({ asset }) => asset))
  if (!assetInput) return from([0n, 0])
  return from(side === 'long' ? assetInput : multiply(assetInput, -1))
}, 150)

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>(function OrderFormPanel(
  props,
  ref,
) {
  return (
    <Panel
      ref={ref}
      name="Order Form"
      bodyProps={{
        className: 'p-3 md:overflow-y-scroll overflow-x-hidden justify-between sm:justify-start',
      }}
      {...props}
    >
      <TransferMarginButton />
      <MarginDetails />

      <SideSelector />
      <OrderSizeInput />
      <LiquidationInfo />

      <DepositMarginToReduceRisk />

      <PlaceOrderButton />

      <OrderDetails />
    </Panel>
  )
})
