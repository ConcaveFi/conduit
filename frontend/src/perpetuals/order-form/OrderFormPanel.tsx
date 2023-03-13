import { cx, NumericInput, Panel, PanelProps, Skeleton } from '@tradex/interface'
import * as Slider from '@tradex/interface/components/primitives/Slider'
import { useTranslation } from '@tradex/languages'
import {
  abs,
  divide,
  Dnum,
  equal,
  from,
  greaterThan,
  isDnum,
  multiply,
  subtract,
  toNumber,
  toParts,
} from 'dnum'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  useMarketDataPositionDetails,
  useMarketRemainingMargin,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { MarketKey } from 'perps-hooks/markets'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { forwardRef, memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { DEFAULT_PRICE_IMPACT_DELTA, MAX_LEVERAGE, TrackingCode } from 'src/constants/perps-config'
import { MarketSummaries, useMarketSettings, useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { UrlModal } from 'src/utils/enum/urlModal'
import { toBigNumber } from 'src/utils/toBigNumber'
import { useDebounce } from 'usehooks-ts'
import { dn, format } from 'src/utils/format'
import { Address, useAccount } from 'wagmi'
import {
  offchainPricesAtoms,
  routeMarketPriceAtom,
  useSkewAdjustedOffChainPrice,
} from '../hooks/useOffchainPrice'
import { TradePreview, useTradePreview } from '../hooks/useTradePreview'
import { TransferMarginButton } from './TransferMargin'

const SideSelector = memo(function SideSelector() {
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
})

const selectAddress = (m) => m.address
const OrderSizeInput = ({
  // onChange,
  // inputs,
  assetSymbol = '',
}: {
  // onChange: (s: InputState) => void
  // inputs: ReturnType<typeof deriveInputs>
  assetSymbol: string | undefined
}) => {
  const onChange = useSetAtom(orderInputAtom)
  const inputs = useAtomValue(orderDerivedValuesAtom)

  const [amountDenominator, toggleAmountDenominator] = useReducer(
    (s) => (s === 'usd' ? 'asset' : 'usd'),
    'usd',
  )
  const other = amountDenominator === 'usd' ? 'asset' : 'usd'
  const symbols = { usd: 'sUSD', asset: assetSymbol }

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
                className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
                placeholder="0.00"
                value={format(inputs[amountDenominator], false)}
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

const SizeSlider = memo(function SizeSlider({
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
})

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

  const marketPrice = useMarketPrice({ marketKey: market?.key })

  const enabled = !!account && !!market && !!marketPrice && sizeDelta && !equal(sizeDelta, 0)

  return useTradePreview({
    address: market && market.address,
    enabled,
    args: enabled
      ? [toBigNumber(sizeDelta), toBigNumber(marketPrice), OrderType.delayedOffchain, account]
      : undefined,
    keepPreviousData: true,
  })
}

const selectToNumber = (buyingPower: Dnum) => (buyingPower ? toNumber(buyingPower, 2) : 0)
const LiquidationPrice = memo(function LiquidationPrice() {
  const { data: buyingPower = 0 } = useBuyingPower({ select: selectToNumber })

  const sizeUsd = useAtomValue(selectAtom(orderDerivedValuesAtom, (v) => toNumber(v.usd, 2)))
  const color = useInterpolateLiquidationRiskColor(sizeUsd, buyingPower)
  const riskLabel = riskLevelLabel(sizeUsd, buyingPower)

  const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)
  const { data: tradePreview, isLoading } = useDebouncedTradePreview({ sizeDelta })

  const onChange = useSetAtom(orderInputAtom)

  return (
    <div className="bg-ocean-700 flex w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <div className="flex justify-between">
        <span className="text-ocean-200 text-xs">Liquidation Price:</span>
        <span className="text-ocean-200 text-xs">Risk Level</span>
      </div>
      <div className="flex flex-col gap-2 font-mono">
        <div className="flex h-7 items-center justify-between">
          {sizeUsd > 0 && isLoading ? (
            <Skeleton className="mb-1 h-5 w-24" />
          ) : (
            <NumericInput
              disabled
              className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
              placeholder="0.00"
              prefix="$"
              value={format(tradePreview?.liquidationPrice)}
              decimalScale={2}
              onValueChange={({ value }, { source }) => {
                // if (source === 'event') onChange({ value, type: amountDenominator })
              }}
            />
          )}
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
})

type InputState = { value: string; type: 'usd' | 'asset' }
const deriveInputs = (input?: InputState, price?: Dnum): Record<'usd' | 'asset', Dnum> => {
  const { value, type } = input || {}
  if (!value || !type) return { usd: [0n, 0], asset: [0n, 0] }
  if (!price || equal(price, 0)) return { usd: [0n, 0], asset: [0n, 0], [type]: value }
  const amount = dn(value)
  return {
    usd: () => ({ usd: amount, asset: divide(amount, price, 18) }),
    asset: () => ({ usd: multiply(amount, price, 18), asset: amount }),
  }[type]()
}

const OrderType = {
  atomic: 0,
  delayed: 1,
  delayedOffchain: 2,
}

const MarginDetails = memo(function MarginDetails({
  market,
  account,
}: {
  market: Address | undefined
  account: Address | undefined
}) {
  const { data: details } = useMarketDataPositionDetails({
    args: !!market && !!account ? [market, account] : undefined,
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
})

const TradeDetails = memo(function TradeDetails({
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
})

const PlaceOrderButton = memo(function PlaceOrderButton({
  market,
}: // sizeDelta,
{
  market: Address | undefined
  // sizeDelta: Dnum
}) {
  const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)

  const { data: isOverBuyingPower } = useBuyingPower({
    select: useCallback(
      (buyingPower) => !!sizeDelta && greaterThan(abs(sizeDelta), buyingPower),
      [sizeDelta],
    ),
  })

  const side = useAtomValue(sideAtom)

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market,
    enabled: !!market && !equal(sizeDelta, 0) && !isOverBuyingPower,
    args: [toBigNumber(sizeDelta), toBigNumber(DEFAULT_PRICE_IMPACT_DELTA), TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  if (equal(sizeDelta, 0))
    return (
      <button
        disabled
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 font-bold h-11 rounded-lg shadow-lg"
      >
        Enter an amount
      </button>
    )

  if (isOverBuyingPower)
    return (
      <button
        disabled
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 font-bold h-11 rounded-lg shadow-lg"
      >
        Not enough margin
      </button>
    )

  return (
    <button
      // onClick={submitOrder}
      // disabled={!submitOrder}
      className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 font-bold h-11 rounded-lg bg-teal-500 text-white shadow-lg"
    >
      Place {side}
    </button>
  )
})

function useBuyingPower<TSelect = Dnum>({ select }: { select?: (b: Dnum) => TSelect } = {}) {
  const market = useRouteMarket({ select: selectAddress })
  const { address: account } = useAccount()
  return useMarketRemainingMargin({
    address: market,
    args: account && [account],
    enabled: !!account && !!market,
    select: useCallback(
      (d) => {
        const margin = dn([d.marginRemaining.toBigInt(), 18])
        const buyingPower = multiply(margin, MAX_LEVERAGE)
        return select ? select(buyingPower) : (buyingPower as TSelect)
      },
      [select],
    ),
  })
}

function DepositMarginToReduceRisk() {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ocean-200 text-xs">Increase margin to reduce risk</span>
      <Link
        href={`?modal=${UrlModal.TRANSFER_MARGIN}`}
        className="text-ocean-200 border-ocean-300 hover:bg-ocean-400 rounded-md border px-3 py-0.5 text-xs"
      >
        Deposit Margin
      </Link>
    </div>
  )
}

const useMarketPrice = ({ marketKey }: { marketKey?: MarketKey }) => {
  const marketPrice = useSkewAdjustedOffChainPrice({ marketKey })
  // price updates all the time thru the websocket connection
  const debouncedMarketPrice = useDebounce(marketPrice, 200)
  return debouncedMarketPrice
}

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import atomWithDebounce from 'src/utils/atom-utils'
import { selectAtom } from 'jotai/vanilla/utils'

const sideAtom = atom<'long' | 'short'>('long')
const orderInputAtom = atom<InputState>({ value: '', type: 'usd' })
const orderDerivedValuesAtom = atom((get) => {
  const input = get(orderInputAtom)
  const marketPrice = get(routeMarketPriceAtom)
  return deriveInputs(input, marketPrice)
})

const sizeDeltaAtom = atomWithDebounce((get) => {
  const side = get(sideAtom)
  const assetInput = get(orderDerivedValuesAtom).asset
  return side === 'long' ? assetInput : multiply(assetInput, -1)
}, 150)

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>(function OrderFormPanel(
  props,
  ref,
) {
  const { t } = useTranslation()

  const market = useRouteMarket()

  const { address: account } = useAccount()

  return (
    <Panel
      ref={ref}
      name="Order Form"
      bodyProps={{ className: 'p-3 md:overflow-y-scroll overflow-x-hidden' }}
      {...props}
    >
      <TransferMarginButton asset={market?.asset} />
      <MarginDetails account={account} market={market?.address} />

      <SideSelector />

      <OrderSizeInput assetSymbol={market?.asset} />

      <LiquidationPrice />

      <DepositMarginToReduceRisk />

      <PlaceOrderButton market={market?.address} />

      {/* <TradeDetails
        marketKey={market?.key}
        fee={tradePreview.data?.fee}
        entryPrice={tradePreview.data?.entryPrice}
      /> */}
    </Panel>
  )
})
