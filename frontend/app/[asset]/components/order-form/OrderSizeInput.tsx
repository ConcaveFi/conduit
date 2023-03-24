import { NumericInput } from '@tradex/interface'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { divide, Dnum, equal, greaterThan, isDnum, multiply } from 'dnum'
import { AnimatePresence, motion, useForceUpdate } from 'framer-motion'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useReducer, useRef } from 'react'
import { format, safeStringDnum } from 'utils/format'
import { routeMarketPriceAtom } from '../../lib/price/price'
import { useMarginDetails } from './MarginDetails'

export type InputState = { value: string | Dnum; type: 'usd' | 'asset' }
export const orderInputAtom = atom<InputState>({ value: '', type: 'usd' })

export const orderDerivedValuesAtom = atom((get) => {
  const { value, type } = get(orderInputAtom)
  if (!value) return { usd: '', asset: '' } as const

  const price = get(routeMarketPriceAtom)

  const amount = isDnum(value) ? value : safeStringDnum(value)
  if (!price || equal(price, 0)) return { usd: '', asset: '', [type]: amount } as const
  return {
    usd: () => ({ usd: amount, asset: divide(amount, price, 18) }),
    asset: () => ({ usd: multiply(amount, price, 18), asset: amount }),
  }[type]()
})

export const OrderSizeInput = () => {
  const routeMarket = useRouteMarket()

  const [amountDenominator, toggleAmountDenominator] = useReducer(
    (s) => (s === 'usd' ? 'asset' : 'usd'),
    'usd',
  )
  const other = amountDenominator === 'usd' ? 'asset' : 'usd'
  const symbols = { usd: 'sUSD', asset: routeMarket?.asset }

  const onChange = useSetAtom(orderInputAtom)
  const inputs = useAtomValue(orderDerivedValuesAtom)
  const value = inputs[amountDenominator]

  const { data: isOverBuyingPower } = useMarginDetails(
    ({ buyingPower }) => !!inputs.usd && greaterThan(inputs.usd, buyingPower),
  )

  const hasValue = greaterThan(inputs[other] || 0, 0)
  const gotFocused = useRef(false)
  const isFocused = useRef(false)
  if (hasValue === false) gotFocused.current = false
  // if you're adjusting the size with the liquidation price slider,
  // we dont want the layout to shift by showing the derived value
  // so it will show on focus if any, or update if already shown before :)
  const shouldShowDerivedValue = hasValue && (gotFocused.current || isFocused.current)

  const [rerender] = useForceUpdate()

  return (
    <motion.div className="bg-dark-main-bg ocean:bg-blue-main-bg flex max-h-20 w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <span className="ocean:text-ocean-200 text-xs text-white">Order Size</span>
      <div className="flex w-full max-w-full justify-between">
        <div className="flex min-w-0 flex-col">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`order-size-${amountDenominator}`}
              {...(isFocused.current && {
                layout: 'position',
                layoutId: `order-size-${amountDenominator}`,
              })}
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              exit={{ y: -4, opacity: 0 }}
              transition={{ layout: { ease: 'backOut' } }}
            >
              <NumericInput
                onFocus={() => {
                  isFocused.current = true
                  gotFocused.current = true
                  if (hasValue) rerender()
                }}
                onBlur={() => {
                  isFocused.current = false
                }}
                data-overflow={isOverBuyingPower}
                variant="none"
                className="placeholder:ocean:text-ocean-200 placeholder:text-silver min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
                placeholder="0.00"
                value={value ? format(value, { trailingZeros: false }) : ''}
                onValueChange={({ value }, { source }) => {
                  if (source === 'event') onChange({ value, type: amountDenominator })
                }}
              />
            </motion.div>

            {isOverBuyingPower ? (
              <motion.span
                key="order-size-error"
                layout
                initial={{ opacity: 0, y: -4, height: inputs[other] ? 'auto' : 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="font-mono text-xs text-red-400"
              >
                Over your buying power
              </motion.span>
            ) : (
              shouldShowDerivedValue && (
                <motion.button
                  key={`order-size-${other}`}
                  layout
                  layoutId={`order-size-${other}`}
                  onClick={toggleAmountDenominator}
                  initial={{ opacity: 0, y: -4, height: inputs[other] ? 'auto' : 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ layout: { ease: 'backOut' } }}
                  exit={{ opacity: 0, y: -4, height: isOverBuyingPower ? 'auto' : 0 }}
                  className="text-dark-30 ocean:text-blue-30 min-h-0 max-w-full text-ellipsis text-start font-mono text-xs outline-none transition-all duration-500 hover:text-white"
                >
                  <span className="text-ellipsis font-medium">{format(inputs[other], 9)}</span>
                  <span className="ml-0.5 text-inherit">{symbols[other]}</span>
                </motion.button>
              )
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={toggleAmountDenominator}
          className="hover:bg-ocean-500 -mx-2 mb-auto rounded-xl px-2 py-1 text-sm font-medium text-white"
        >
          {symbols[amountDenominator]}
        </button>
      </div>
    </motion.div>
  )
}
