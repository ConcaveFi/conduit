import { cx, NumericInput, Panel, PanelProps, Skeleton } from '@tradex/interface'
import * as Slider from '@tradex/interface/components/primitives/Slider'
import { useTranslation } from '@tradex/languages'
import {
  DEFAULT_PRICE_IMPACT_DELTA,
  MAX_LEVERAGE,
  TrackingCode,
} from 'app/[asset]/constants/perps-config'
import { useMarketSettings, useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { abs, divide, Dnum, equal, from, greaterThan, multiply, subtract, toNumber } from 'dnum'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  useMarketDataPositionDetails,
  useMarketRemainingMargin,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { forwardRef, useCallback, useEffect, useReducer } from 'react'
import atomWithDebounce from 'utils/atom-utils'
import { useQueryModal } from 'utils/enum/urlModal'
import { format, safeStringDnum } from 'utils/format'
import { toBigNumber } from 'utils/toBigNumber'
import { useAccount } from 'wagmi'
import {
  routeMarketPriceAtom,
  useSkewAdjustedOffChainPrice,
} from '../../lib/price/useOffchainPrice'
import { useTradePreview } from '../../lib/useTradePreview'
import { TransferMarginButton } from './TransferMargin'

function SideSelector() {
  const { t } = useTranslation()
  const [side, setSide] = useAtom(sideAtom)
  return (
    <div className="flex gap-4 font-mono">
      <button
        onClick={() => setSide('long')}
        className={cx(
          `btn centered flex-1 rounded-lg py-2`,
          side === 'long'
            ? 'bg-teal-500  text-white'
            : 'text-teal-400 ring-1 ring-inset ring-teal-400',
        )}
      >
        {t('long')}
      </button>
      <button
        onClick={() => setSide('short')}
        className={cx(
          'centered btn flex-1 rounded-lg py-2',
          side === 'short'
            ? 'bg-red-500 text-white'
            : 'text-red-400 ring-1 ring-inset ring-red-400',
        )}
      >
        {t('short')}
      </button>
    </div>
  )
}

const selectAddress = (m) => m.address
const OrderSizeInput = () => {
  const routeMarket = useRouteMarket()
  const onChange = useSetAtom(orderInputAtom)
  const inputs = useAtomValue(orderDerivedValuesAtom)

  const [amountDenominator, toggleAmountDenominator] = useReducer(
    (s) => (s === 'usd' ? 'asset' : 'usd'),
    'usd',
  )
  const other = amountDenominator === 'usd' ? 'asset' : 'usd'
  const symbols = { usd: 'sUSD', asset: routeMarket.asset }

  const { data: isOverBuyingPower } = useBuyingPower({
    select: useCallback(
      (buyingPower) => !!inputs.usd && greaterThan(inputs.usd, buyingPower),
      [inputs.usd],
    ),
  })

  const hasValue = greaterThan(inputs[other] || 0, 0)

  return (
    <motion.div className="bg-ocean-700 flex max-h-20 w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <span className="text-ocean-200 text-xs">Order Size</span>
      <div className="flex w-full max-w-full justify-between">
        <div className="flex min-w-0 flex-col">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`order-size-${amountDenominator}`}
              layout="position"
              layoutId={`order-size-${amountDenominator}`}
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              exit={{ y: -4, opacity: 0 }}
              transition={{ layout: { ease: 'backOut' } }}
            >
              <NumericInput
                data-overflow={isOverBuyingPower}
                variant={'none'}
                className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
                placeholder="0.00"
                value={format(inputs[amountDenominator], undefined)}
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
              hasValue && (
                <motion.button
                  key={`order-size-${other}`}
                  layout
                  layoutId={`order-size-${other}`}
                  onClick={toggleAmountDenominator}
                  initial={{ opacity: 0, y: -8, height: inputs[other] ? 'auto' : 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ layout: { ease: 'backOut' } }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    height: isOverBuyingPower ? 'auto' : 0,
                  }}
                  className=" text-ocean-200 min-h-0 max-w-full text-ellipsis text-start font-mono text-xs outline-none hover:text-white"
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

const useInterpolateLiquidationRiskColor = (value: number, max: number) => {
  const v = useMotionValue(value)
  useEffect(() => v.set(value), [value, v])
  return useTransform(v, [max, max / 2, 0], ['#f87171', '#facc15', '#4ade80'])
}

function SizeSlider({
  value,
  max,
  onChange,
  disabled,
}: {
  value: number
  max: number
  onChange: (s: InputState) => void
  disabled: boolean
}) {
  const handleSizeSlider = useCallback(
    (v: number[]) => {
      const value = v[0]
      if (!max) return
      if (value === 0) return onChange({ value: '', type: 'usd' })
      onChange({ value: value.toString(), type: 'usd' })
    },
    [max, onChange],
  )

  const borderColor = useInterpolateLiquidationRiskColor(value, max)

  return (
    <Slider.Root
      disabled={disabled}
      value={[value > max ? max : value]}
      step={0.5}
      max={max}
      onValueChange={handleSizeSlider}
      className="relative flex w-full touch-none select-none items-center"
    >
      <Slider.Track
        className={cx(
          'h-1 flex-1 rounded-full',
          disabled ? 'bg-ocean-500' : 'bg-gradient-to-r from-green-400 via-yellow-400 to-red-400',
        )}
      />
      <Slider.Thumb asChild>
        <motion.span
          className={cx(
            'box-4 bg-ocean-800 block rounded-full border-2 outline-none transition-all duration-300 ease-out will-change-transform hover:scale-110',
          )}
          style={{ borderColor: disabled ? 'rgb(62 83 137)' : borderColor }}
        />
      </Slider.Thumb>
    </Slider.Root>
  )
}

// function _liquidationPremium(positionSize, currentPrice) {
//   // note: this is the same as fillPrice() where the skew is 0.
//   const notional = _abs(_notionalValue(positionSize, currentPrice));

//   return
//       _abs(positionSize).divideDecimal(_skewScale(_marketKey())).multiplyDecimal(notional).multiplyDecimal(
//           _liquidationPremiumMultiplier(_marketKey())
//       );
// }

// function _liquidationFee(positionSize, price) {
//   // size * price * fee-ratio
//   const proportionalFee = _abs(positionSize).multiplyDecimal(price).multiplyDecimal(_liquidationFeeRatio());
//   const maxFee = _maxKeeperFee();
//   const cappedProportionalFee = proportionalFee > maxFee ? maxFee : proportionalFee;
//   const minFee = _minKeeperFee();

//   return cappedProportionalFee > minFee ? cappedProportionalFee : minFee; // not using _max() helper because it's for signed ints
// }

// function _liquidationMargin(positionSize, price) {
//   const liquidationBuffer = _abs(positionSize).multiplyDecimal(price).multiplyDecimal(_liquidationBufferRatio());
//   return liquidationBuffer.add(_liquidationFee(positionSize, price));
// }

// const liquidationPrice = (position, currentPrice) => {
//     (position.lastPrice
//       .add(_liquidationMargin(position.size, currentPrice))
//       .sub(position.margin.sub(_liquidationPremium(position.size, currentPrice)))
//       .divideDecimal(position.size))
//       .sub(_netFundingPerUnit(position.lastFundingIndex, currentPrice));
// }

const riskLevelLabel = (value: number, max: number) => {
  // if (!value || value < remainingMargin) return 'NONE'
  if (value <= max * 0.25) return 'LOW'
  if (value <= max * 0.75) return 'MEDIUM'
  return 'HIGH'
}

function useDebouncedTradePreview({ sizeDelta }: { sizeDelta: Dnum }) {
  const market = useRouteMarket()
  const { address: account } = useAccount()

  const marketPrice = useSkewAdjustedOffChainPrice({ marketKey: market?.key })

  return useTradePreview({
    market: market.address,
    sizeDelta,
    marketPrice,
    account,
  })
}

const selectToNumber = (buyingPower: Dnum) => (buyingPower ? toNumber(buyingPower, 2) : 0)
function LiquidationPrice() {
  const { data: buyingPower = 0 } = useBuyingPower({ select: selectToNumber })

  const a = useAtomValue(orderDerivedValuesAtom)
  const sizeUsd = toNumber(a.usd, 2)

  const color = useInterpolateLiquidationRiskColor(sizeUsd, buyingPower)
  const riskLabel = riskLevelLabel(sizeUsd, buyingPower)

  const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)
  // const { data: tradePreview, isLoading } = useDebouncedTradePreview({ sizeDelta })

  const onChange = useSetAtom(orderInputAtom)

  return (
    <div className="bg-ocean-700 flex w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <div className="flex justify-between">
        <span className="text-ocean-200 text-xs">Liquidation Price:</span>
        <span className="text-ocean-200 text-xs">Risk Level</span>
      </div>
      <div className="flex flex-col gap-2 font-mono">
        <div className="flex h-7 items-center justify-between">
          {/* {sizeUsd > 0 && isLoading ? (
            <Skeleton className="mb-1 h-5 w-24" />
          ) : (
            <NumericInput
              disabled
              variant={'none'}
              className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
              placeholder="0.00"
              prefix="$"
              value={format(tradePreview?.liquidationPrice)}
              decimalScale={2}
              onValueChange={({ value }, { source }) => {
                // if (source === 'event') onChange({ value, type: amountDenominator })
              }}
            />
          )} */}
          <motion.span style={{ color }} className="font-bold">
            {riskLabel}
          </motion.span>
        </div>
        <SizeSlider value={sizeUsd} max={buyingPower} onChange={onChange} disabled={!buyingPower} />
        <div className="flex justify-between font-mono">
          <span className={cx('text-xs', buyingPower ? 'text-green-500' : 'text-ocean-300')}>
            $0
          </span>
          {!!buyingPower && (
            <span className="text-xs text-orange-500">$ {format(buyingPower)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

type InputState = { value: string; type: 'usd' | 'asset' }
const deriveInputs = (input?: InputState, price?: Dnum): Record<'usd' | 'asset', Dnum> => {
  const { value, type } = input || {}
  if (!value || !type) return { usd: [0n, 0], asset: [0n, 0] }
  if (!price || equal(price, 0)) return { usd: [0n, 0], asset: [0n, 0], [type]: value }
  const amount = safeStringDnum(value)
  return {
    usd: () => ({ usd: amount, asset: divide(amount, price, 18) }),
    asset: () => ({ usd: multiply(amount, price, 18), asset: amount }),
  }[type]()
}

function MarginDetails() {
  const market = useRouteMarket()
  const { address: account } = useAccount()

  const { data: details } = useMarketDataPositionDetails({
    args: !!market.address && !!account ? [market.address, account] : undefined,
    enabled: !!market && !!account,
    select: (p) => {
      const details = parsePositionDetails(p)
      const buyingPower = multiply(details.remainingMargin, MAX_LEVERAGE)
      return {
        buyingPower,
        available: subtract(buyingPower, details.notionalValue),
        notionalValue: details.notionalValue,
        remainingMargin: details.remainingMargin,
      }
    },
  })

  const { notionalValue, remainingMargin, available, buyingPower } = details || {}

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">Deposited</span>
          {!remainingMargin ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-white">$ {format(remainingMargin)}</span>
          )}
        </div>
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">Buying power</span>
          {!buyingPower ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-green-400">$ {format(buyingPower)}</span>
          )}
        </div>
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">In position</span>
          {!notionalValue ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-red-400">$ {format(notionalValue)}</span>
          )}
        </div>
      </div>
      <div className="bg-ocean-400 flex justify-between rounded-lg p-3 text-sm">
        <span className="text-ocean-200">Available</span>
        {!available ? (
          <Skeleton />
        ) : (
          <span className="font-mono text-white">$ {format(available)}</span>
        )}
      </div>
    </div>
  )
}

function TradeDetails({
  marketKey,
  fee,
  entryPrice,
}: {
  marketKey: MarketKey | undefined
  fee: Dnum | undefined
  entryPrice: Dnum | undefined
}) {
  const { data: executionFee } = useMarketSettings({
    marketKey,
    select: (settings) => settings.minKeeperFee,
  })

  return (
    <ul className="text-ocean-200 text-xs">
      <li className="bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
        <span>Entry price:</span>
        {entryPrice && <span>$ {format(entryPrice)}</span>}
      </li>
      <li className="flex w-full justify-between px-2 py-0.5">
        <span>Execution Fee:</span>
        {executionFee && <span>$ {format(executionFee)}</span>}
      </li>
      <li className="bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
        <span>Trade Fee: </span>
        {fee && <span>$ {format(fee)}</span>}
      </li>
    </ul>
  )
}

function PlaceOrderButton() {
  const market = useRouteMarket()
  const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)

  const { data: isOverBuyingPower } = useBuyingPower({
    select: useCallback(
      (buyingPower) => !!sizeDelta && greaterThan(abs(sizeDelta), buyingPower),
      [sizeDelta],
    ),
  })

  const side = useAtomValue(sideAtom)

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market.address,
    enabled: !equal(sizeDelta, 0) && !isOverBuyingPower,
    args: [toBigNumber(sizeDelta), toBigNumber(DEFAULT_PRICE_IMPACT_DELTA), TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  if (equal(sizeDelta, 0))
    return (
      <button
        disabled
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 h-11 rounded-lg font-bold shadow-lg"
      >
        Enter an amount
      </button>
    )

  if (isOverBuyingPower)
    return (
      <button
        disabled
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 h-11 rounded-lg font-bold shadow-lg"
      >
        Not enough margin
      </button>
    )

  return (
    <button
      // onClick={submitOrder}
      // disabled={!submitOrder}
      className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 h-11 rounded-lg bg-teal-500 font-bold text-white shadow-lg"
    >
      Place {side}
    </button>
  )
}

function DepositMarginToReduceRisk() {
  const { onOpen } = useQueryModal({ modalType: 'margin', type: 'transfer' })
  return (
    <div className="flex items-center justify-between">
      <span className="text-ocean-200 text-xs">Increase margin to reduce risk</span>
      <button
        onClick={onOpen}
        className="text-ocean-200 border-ocean-300 hover:bg-ocean-400 rounded-md border px-3 py-0.5 text-xs"
      >
        Deposit Margin
      </button>
    </div>
  )
}

function useBuyingPower<TSelect = Dnum>({ select }: { select?: (b: Dnum) => TSelect } = {}) {
  const market = useRouteMarket()
  const { address: account } = useAccount()
  return useMarketRemainingMargin({
    address: market.address,
    args: account && [account],
    enabled: !!account && !!market,
    select: useCallback(
      (d) => {
        const margin = from([d.marginRemaining.toBigInt(), 18])
        const buyingPower = multiply(margin, MAX_LEVERAGE)
        return select ? select(buyingPower) : (buyingPower as TSelect)
      },
      [select],
    ),
  })
}

const sideAtom = atom<'long' | 'short'>('long')
const orderInputAtom = atom<InputState>({ value: '', type: 'usd' })
const orderDerivedValuesAtom = atom((get) => {
  const input = get(orderInputAtom)
  if (!input.value) return { usd: from([0n, 0]), asset: from([0n, 0]) }
  const marketPrice = get(routeMarketPriceAtom)
  return deriveInputs(input, marketPrice)
})

const sizeDeltaAtom = atomWithDebounce((get) => {
  const side = get(sideAtom)
  const assetInput = get(orderDerivedValuesAtom).asset
  if (!assetInput) return from([0n, 0])
  return side === 'long' ? assetInput : multiply(assetInput, -1)
}, 150)

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>(function OrderFormPanel(
  props,
  ref,
) {
  return (
    <Panel
      ref={ref}
      name="Order Form"
      bodyProps={{ className: 'p-3 md:overflow-y-scroll overflow-x-hidden' }}
      {...props}
    >
      <TransferMarginButton />
      <MarginDetails />

      <SideSelector />
      <OrderSizeInput />
      <LiquidationPrice />

      <DepositMarginToReduceRisk />

      <PlaceOrderButton />

      {/* <TradeDetails
        marketKey={market?.key}
        fee={tradePreview.data?.fee}
        entryPrice={tradePreview.data?.entryPrice}
      /> */}
    </Panel>
  )
})
