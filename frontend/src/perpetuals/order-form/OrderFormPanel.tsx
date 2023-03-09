import { cx, NumericInput, Panel, PanelProps, twMerge } from '@tradex/interface'
import * as Slider from '@tradex/interface/components/primitives/Slider'
import { useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
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
import { useMarketSettings, useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { UrlModal } from 'src/utils/enum/urlModal'
import { formatUsd, safeFixedNumber } from 'src/utils/format'
import { useDebounce } from 'usehooks-ts'
import { Address, useAccount } from 'wagmi'
import { useSkewAdjustedOffChainPrice } from '../hooks/useOffchainPrice'
import { useTradePreview } from '../hooks/useTradePreview'
import { TransferMarginButton } from './TransferMargin'

const SideSelector = memo(function SideSelector({
  side,
  onChange,
}: {
  side: 'long' | 'short'
  onChange: (side: 'long' | 'short') => void
}) {
  const { t } = useTranslation()
  return (
    <div className="flex gap-4 font-mono">
      <button
        onClick={() => onChange('long')}
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
        onClick={() => onChange('short')}
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

const OrderSizeInput = ({
  onChange,
  inputs,
  assetSymbol = '',
  max = '0',
}: {
  onChange: (s: InputState) => void
  inputs: ReturnType<typeof deriveInputs>
  assetSymbol: string | undefined
  max: string | undefined
}) => {
  const [amountDenominator, toggleAmountDenominator] = useReducer(
    (s) => (s === 'usd' ? 'asset' : 'usd'),
    'usd',
  )
  const other = amountDenominator === 'usd' ? 'asset' : 'usd'
  const symbols = { usd: 'sUSD', asset: assetSymbol }

  const isOverBuyingPower =
    !!max && !!inputs.usd && parseEther(inputs.usd.toString()).gt(parseEther(max))

  const hasValue = +inputs[other].toString() > 0

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
            >
              <NumericInput
                data-overflow={isOverBuyingPower}
                className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
                placeholder="0.00"
                value={inputs[amountDenominator].toString()}
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
                  exit={{
                    opacity: 0,
                    y: -8,
                    height: isOverBuyingPower ? 'auto' : 0,
                  }}
                  className=" text-ocean-200 min-h-0 max-w-full text-ellipsis text-start font-mono text-xs outline-none hover:text-white"
                >
                  <span className="text-ellipsis font-medium">{inputs[other].toString()}</span>
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

const useInterpolateSliderColor = (value: number, max: number) => {
  const v = useMotionValue(value)
  useEffect(() => v.set(value), [value, v])
  return useTransform(v, [0, max / 2, max], ['#4ade80', '#facc15', '#f87171'])
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

  const borderColor = useInterpolateSliderColor(value, max)

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
  if (value >= max * 0.75) return 'HIGH'
  if (value >= max * 0.25) return 'MEDIUM'
  return 'LOW'
}

const LiquidationPrice = memo(function LiquidationPrice({
  liquidationPrice,
  isLoading,
  max = '0',
  sizeUsd,
  onChange,
}: {
  isLoading: boolean
  liquidationPrice: string | undefined
  max: string | undefined
  sizeUsd: string
  onChange: (s: InputState) => void
}) {
  const color = useInterpolateSliderColor(+sizeUsd, +max)
  const riskLabel = riskLevelLabel(+sizeUsd, +max)

  return (
    <div className="bg-ocean-700 flex w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <div className="flex justify-between">
        <span className="text-ocean-200 text-xs">Liquidation Price:</span>
        <span className="text-ocean-200 text-xs">Risk Level</span>
      </div>
      <div className="flex flex-col gap-2 font-mono">
        <div className="flex h-7 items-center justify-between">
          {+sizeUsd > 0 && isLoading ? (
            <Skeleton className="mb-1 h-5 w-24" />
          ) : (
            <NumericInput
              disabled
              className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
              placeholder="0.00"
              prefix="$"
              value={liquidationPrice || ''}
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
        <SizeSlider value={+sizeUsd} max={+max} onChange={onChange} disabled={max === '0'} />
        <div className="flex justify-between font-mono">
          <span className={cx('text-xs', max ? 'text-green-500' : 'text-ocean-300')}>$0</span>
          {max && <span className="text-xs text-orange-500">{formatUsd(max)}</span>}
        </div>
      </div>
    </div>
  )
})

type InputState = { value: string; type: 'usd' | 'asset' }
const deriveInputs = (input?: InputState, price?: FixedNumber) => {
  const { value, type } = input || {}
  if (!value || !type) return { usd: '', asset: '' }
  if (!price || price.isZero()) return { usd: '', asset: '', [type]: value }
  const amount = safeFixedNumber(value)
  return {
    usd: () => ({ usd: value, asset: amount.divUnsafe(price) }),
    asset: () => ({ usd: amount.mulUnsafe(price), asset: value }),
  }[type]()
}

const OrderType = {
  atomic: 0,
  delayed: 1,
  delayedOffchain: 2,
}

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={twMerge(
      'animate-skeleton skeleton-from-ocean-300 skeleton-to-ocean-400 h-3 w-full rounded',
      className,
    )}
  />
)

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
      const buyingPower = details.remainingMargin.mulUnsafe(MAX_LEVERAGE)
      return {
        buyingPower,
        available: buyingPower.subUnsafe(details.notionalValue),
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
            <span className="font-mono text-white">{formatUsd(remainingMargin)}</span>
          )}
        </div>
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">Buying power</span>
          {!buyingPower ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-green-400">{formatUsd(buyingPower)}</span>
          )}
        </div>
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">In position</span>
          {!notionalValue ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-red-400">{formatUsd(notionalValue)}</span>
          )}
        </div>
      </div>
      <div className="bg-ocean-400 flex justify-between rounded-lg p-3 text-sm">
        <span className="text-ocean-200">Available</span>
        {!available ? (
          <Skeleton />
        ) : (
          <span className="font-mono text-white">{formatUsd(available)}</span>
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
  fee: FixedNumber | undefined
  entryPrice: FixedNumber | undefined
}) {
  const { data: executionFee } = useMarketSettings({
    marketKey,
    select: (settigns) => settigns.minKeeperFee,
  })

  return (
    <ul className="text-ocean-200 text-xs">
      <li className="bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
        <span>Entry price:</span>
        {entryPrice && <span> {formatUsd(entryPrice)}</span>}
      </li>
      <li className="flex w-full justify-between px-2 py-0.5">
        <span>Execution Fee:</span>
        {executionFee && <span>{formatUsd(executionFee)}</span>}
      </li>
      <li className="bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
        <span>Trade Fee: </span>
        {fee && <span>{formatUsd(fee)}</span>}
      </li>
    </ul>
  )
})

const PlaceOrderButton = memo(function PlaceOrderButton({
  market,
  sizeDelta,
  buyingPower,
}: {
  market: Address | undefined
  sizeDelta: BigNumber
  buyingPower: string | undefined
}) {
  const isOverBuyingPower =
    !!buyingPower && parseEther(sizeDelta.abs().toString()).gt(parseEther(buyingPower))

  const side = sizeDelta.isNegative() ? 'short' : 'long'
  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market,
    enabled: !sizeDelta.isZero() && !!buyingPower && !isOverBuyingPower,
    args: [sizeDelta, DEFAULT_PRICE_IMPACT_DELTA, TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  if (sizeDelta.isZero())
    return (
      <button
        disabled
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 text-bold h-11 rounded-lg bg-teal-500 text-white shadow-lg"
      >
        Enter an amount
      </button>
    )

  if (isOverBuyingPower)
    return (
      <button
        disabled
        className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 text-bold h-11 rounded-lg bg-teal-500 text-white shadow-lg"
      >
        Order is over your buying power
      </button>
    )

  return (
    <button
      onClick={submitOrder}
      disabled={!submitOrder}
      className="btn centered disabled:bg-ocean-400 disabled:text-ocean-300 text-bold h-11 rounded-lg bg-teal-500 text-white shadow-lg"
    >
      Place {side}
    </button>
  )
})

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>(function OrderFormPanel(
  props,
  ref,
) {
  const { t } = useTranslation()

  const market = useRouteMarket()

  const { data: marketPrice } = useSkewAdjustedOffChainPrice({
    marketKey: market?.key,
    watch: true,
  })

  const [input, setInput] = useState<InputState>()
  const inputs = useMemo(() => deriveInputs(input, marketPrice), [marketPrice, input])

  const [side, setSide] = useState<'long' | 'short'>('long')

  const debouncedSize = useDebounce(inputs.asset, 150)
  const sizeDelta = useMemo(() => {
    const size = BigNumber.from(safeFixedNumber(debouncedSize))
    return side === 'long' ? size : size.mul(-1)
  }, [debouncedSize, side])

  const { address: account } = useAccount()

  const { data: buyingPower } = useMarketRemainingMargin({
    address: market && market.address,
    args: account && [account],
    select: (d) => {
      const margin = FixedNumber.fromValue(d.marginRemaining, 18)
      return margin.mulUnsafe(MAX_LEVERAGE).toString()
    },
  })

  const tradePreview = useTradePreview({
    address: market && market.address,
    enabled: !!market && !!marketPrice && !!sizeDelta,
    args: marketPrice && [
      sizeDelta,
      BigNumber.from(marketPrice),
      OrderType.delayedOffchain,
      account!,
    ],
    keepPreviousData: true,
  })

  return (
    <Panel ref={ref} name="Order Form" bodyProps={{ className: 'p-3' }} {...props}>
      <TransferMarginButton asset={market?.asset} />

      <MarginDetails account={account} market={market?.address} />

      <SideSelector side={side} onChange={setSide} />

      <div className="flex max-w-full flex-col">
        <OrderSizeInput
          inputs={inputs}
          onChange={setInput}
          max={buyingPower}
          assetSymbol={market?.asset}
        />
      </div>

      <LiquidationPrice
        liquidationPrice={tradePreview.data?.liquidationPrice.toString()}
        isLoading={tradePreview.isLoading}
        sizeUsd={inputs.usd.toString()}
        onChange={setInput}
        max={buyingPower}
      />

      <div className="flex items-center justify-between">
        <span className="text-ocean-200 text-xs">Increase margin to reduce risk</span>
        <Link
          href={`?modal=${UrlModal.TRANSFER_MARGIN}`}
          className="text-ocean-200 border-ocean-300 hover:bg-ocean-400 rounded-md border px-3 py-0.5 text-xs"
        >
          Deposit Margin
        </Link>
      </div>

      <PlaceOrderButton market={market?.address} buyingPower={buyingPower} sizeDelta={sizeDelta} />

      <TradeDetails
        marketKey={market?.key}
        fee={tradePreview.data?.fee}
        entryPrice={tradePreview.data?.entryPrice}
      />
    </Panel>
  )
})
