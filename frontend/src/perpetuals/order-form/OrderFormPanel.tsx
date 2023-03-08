import * as Slider from '@radix-ui/react-slider'
import { cx, NumericInput, Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import {
  useMarketDataPositionDetails,
  useMarketPostTradeDetails,
  useMarketRemainingMargin,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { forwardRef, useCallback, useMemo, useReducer, useState } from 'react'
import { DEFAULT_PRICE_IMPACT_DELTA, MAX_LEVERAGE, TrackingCode } from 'src/constants/perps-config'
import { useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { UrlModal } from 'src/utils/enum/urlModal'
import { format, formatPercent, formatUsd, safeFixedNumber } from 'src/utils/format'
import { useDebounce } from 'usehooks-ts'
import { Address, useAccount } from 'wagmi'
import { TransferMarginButton } from './TransferMargin'

function SideSelector({
  side,
  onChange,
}: {
  side: 'long' | 'short'
  onChange: (side: 'long' | 'short') => void
}) {
  const { t } = useTranslation()
  return (
    <div className="flex gap-4">
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
}

const OrderSizeInput = ({
  onChange,
  inputs,
  assetSymbol,
  max,
}: {
  onChange: (s: InputState) => void
  inputs: ReturnType<typeof deriveInputs>
  assetSymbol: string
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

  return (
    <motion.div className="bg-ocean-700 flex max-h-20 w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <span className="text-ocean-200 text-xs">Order Size</span>
      <div className="flex w-full max-w-full justify-between">
        <div className="flex min-w-0 flex-col">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={amountDenominator}
              layout="preserve-aspect"
              layoutId={amountDenominator}
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              exit={{ y: -8, opacity: 0 }}
            >
              <NumericInput
                data-overflow={isOverBuyingPower}
                className="placeholder:text-ocean-200 min-w-0 overflow-ellipsis bg-transparent text-xl font-bold text-white outline-none data-[overflow=true]:text-red-400"
                placeholder="0.00"
                value={inputs[amountDenominator].toString()}
                onValueChange={({ value }, { source }) => {
                  if (source === 'event') onChange({ value, type: amountDenominator })
                }}
              />
            </motion.div>

            {isOverBuyingPower ? (
              <motion.span
                key="error"
                layout
                initial={{ opacity: 0, y: -10, height: inputs[other] ? 'auto' : 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="text-xs text-red-400"
              >
                Over your buying power
              </motion.span>
            ) : (
              inputs[other] && (
                <motion.button
                  key={other}
                  layout="preserve-aspect"
                  layoutId={other}
                  onClick={toggleAmountDenominator}
                  initial={{ opacity: 0, y: -8, height: inputs[other] ? 'auto' : 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    height: isOverBuyingPower ? 'auto' : 0,
                  }}
                  className="text-ocean-200 min-h-0 max-w-full text-ellipsis text-start text-xs outline-none hover:text-white"
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
          className="hover:bg-ocean-500 mb-auto rounded-xl px-3 py-1 text-sm font-medium text-white"
        >
          {symbols[amountDenominator]}
        </button>
      </div>
    </motion.div>
  )
}

function SizeSlider({
  value,
  max,
  onChange,
}: {
  value: string
  max: string | undefined
  onChange: (s: InputState) => void
}) {
  const sliderValue = max ? (+value >= +max ? 1 : +value / +max) : 0

  const handleSizeSlider = useCallback(
    (v: number[]) => {
      const value = v[0]
      if (!max) return
      if (value === 0) return onChange({ value: '', type: 'usd' })
      const sliderValue = safeFixedNumber(value.toString())
      const maxValue = safeFixedNumber(max)
      onChange({
        value: sliderValue.mulUnsafe(maxValue).toString(),
        type: 'usd',
      })
    },
    [max, onChange],
  )

  return (
    <Slider.Root
      value={[sliderValue]}
      step={0.01}
      max={1}
      onValueChange={handleSizeSlider}
      className="flex w-full touch-none select-none items-center"
    >
      <Slider.Track className="h-1 flex-1 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400" />
      <Slider.Thumb
        className={cx(
          'box-4 bg-ocean-800 block rounded-full border-2 transition-all duration-300 ease-out hover:scale-110',
          sliderValue < 0.25
            ? 'border-green-400'
            : sliderValue < 0.75
            ? 'border-yellow-400'
            : 'border-red-400',
        )}
      />
    </Slider.Root>
  )
}

const LiquidationPrice = () => {
  return (
    <div className="bg-ocean-700 flex w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <div className="flex justify-between">
        <span className="text-ocean-200 text-xs">Liquidation Price:</span>
        <span className="text-ocean-200 text-xs">Risk Level</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-white">$1.432.32</span>
          <span className="text-green-400">LOW</span>
        </div>
        <SizeSlider value="500" max="2300" onChange={() => {}} />
        <div className="flex justify-between">
          <span className="text-xs text-green-500">$0</span>
          <span className="text-xs text-orange-500">$2300</span>
        </div>
      </div>
    </div>
  )
}

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

const Skeleton = () => (
  <div className="skeleton skeleton-from-ocean-200 skeleton-to-ocean-300 h-3 w-full" />
)

function BuyingPowerInfo({ market, account }: { market: { address: Address }; account: Address }) {
  const { data: remainingMargin } = useMarketRemainingMargin({
    address: market.address,
    args: [account],
    select: (d) => FixedNumber.fromValue(d.marginRemaining, 18),
  })
  const { data: positionDetails } = useMarketDataPositionDetails({
    args: [market.address, account],
    select: parsePositionDetails,
  })
  const buyingPower = remainingMargin && remainingMargin.mulUnsafe(MAX_LEVERAGE)
  const inPosition = positionDetails?.notionalValue
  const available = inPosition && buyingPower && buyingPower.subUnsafe(inPosition)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">Deposited</span>
          {!remainingMargin ? (
            <Skeleton />
          ) : (
            <span className="text-white">{formatUsd(remainingMargin)}</span>
          )}
        </div>
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">Buying power</span>
          {!buyingPower ? (
            <Skeleton />
          ) : (
            <span className="text-green-400">{formatUsd(buyingPower)}</span>
          )}
        </div>
        <div className="bg-ocean-400 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-ocean-200">In position</span>
          {!inPosition ? (
            <Skeleton />
          ) : (
            <span className="text-red-400">{formatUsd(inPosition)}</span>
          )}
        </div>
      </div>
      <div className="bg-ocean-400 flex justify-between rounded-lg p-3 text-sm">
        <span className="text-ocean-200">Available</span>
        {!available ? <Skeleton /> : <span className="text-white">{formatUsd(available)}</span>}
      </div>
    </div>
  )
}

const FIXED_ONE = FixedNumber.from(1)
export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()

  const market = useRouteMarket()

  const price = market?.price
  const [input, setInput] = useState<InputState>()
  const inputs = useMemo(() => deriveInputs(input, price), [price, input])

  const [side, setSide] = useState<'long' | 'short'>('long')

  const debouncedSize = useDebounce(inputs.asset, 150)
  const sizeDelta = useMemo(() => {
    const size = BigNumber.from(safeFixedNumber(debouncedSize))
    return side === 'long' ? size : size.mul(-1)
  }, [debouncedSize, side])

  const { address } = useAccount()
  const { data: postTradeDetails } = useMarketPostTradeDetails({
    address: market && market.address,
    enabled: !sizeDelta.isZero() && !!address,
    args: [
      sizeDelta,
      BigNumber.from(0), // <- trade price
      OrderType.delayedOffchain,
      address!,
    ],
    select: (d) => ({
      margin: FixedNumber.fromValue(d.margin, 18).toString(),
      liquidationPrice: FixedNumber.fromValue(d.liqPrice, 18).toString(),
      fee: FixedNumber.fromValue(d.fee, 18).toString(),
      price: FixedNumber.fromValue(d.price, 18).toString(),
    }),
  })

  const { data: remainingMargin } = useMarketRemainingMargin({
    address: market && market.market,
    args: address && [address],
    select: (d) => FixedNumber.fromValue(d.marginRemaining, 18),
  })
  const buyingPower =
    remainingMargin && !remainingMargin.isZero()
      ? remainingMargin.mulUnsafe(MAX_LEVERAGE)
      : FIXED_ONE

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market && market.address,
    enabled:
      !sizeDelta.isZero() && buyingPower && sizeDelta.abs().lt(parseEther(buyingPower.toString())),
    args: [BigNumber.from(sizeDelta), DEFAULT_PRICE_IMPACT_DELTA, TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  if (!market) return null

  const feeType = sizeDelta.isNegative() && market.marketSkew.isNegative() ? 'maker' : 'taker'
  const feeRate = market.feeRates[`${feeType}FeeOffchainDelayedOrder`]

  const sizeUsd = safeFixedNumber(inputs.usd)

  const leveragedIn =
    remainingMargin && !remainingMargin.isZero() && sizeUsd.divUnsafe(remainingMargin)

  const sizePercentOfBuyingPower =
    buyingPower && (sizeUsd.isZero() ? FIXED_ONE : sizeUsd).divUnsafe(buyingPower)

  console.log(market)

  return (
    <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
      <TransferMarginButton asset={market?.asset} />

      {address && <BuyingPowerInfo account={address} market={market} />}

      <SideSelector side={side} onChange={setSide} />

      <div className="flex max-w-full flex-col">
        <OrderSizeInput
          inputs={inputs}
          onChange={setInput}
          max={buyingPower?.toString()}
          assetSymbol={market.asset}
        />
      </div>

      <LiquidationPrice />

      <div className="flex items-center justify-between">
        <span className="text-ocean-200 text-xs">Increase margin to reduce risk</span>
        <Link
          href={`?modal=${UrlModal.TRANSFER_MARGIN}`}
          className="text-ocean-200 border-ocean-300 hover:bg-ocean-400 rounded-md border px-3 py-0.5 text-xs"
        >
          Deposit Margin
        </Link>
      </div>

      <button
        onClick={submitOrder}
        disabled={!submitOrder}
        className="btn centered h-11 rounded-lg bg-teal-500 text-white"
      >
        {t('place order')}
      </button>

      <div className="text-ocean-200 flex h-48 flex-col gap-1 text-xs">
        {leveragedIn && (
          <span>
            Leveraged in:{' '}
            {leveragedIn.toUnsafeFloat() < 1
              ? 'Not leveraged'
              : `x${format(leveragedIn)} (max: x${MAX_LEVERAGE.toUnsafeFloat()})`}
          </span>
        )}
        {sizePercentOfBuyingPower && (
          <span>
            Position size is {formatPercent(sizePercentOfBuyingPower)} of your buying power
          </span>
        )}
        <span>Entry price: {postTradeDetails && formatUsd(postTradeDetails.price)}</span>
        <span>
          Liquidation price: {postTradeDetails && formatUsd(postTradeDetails.liquidationPrice)}
        </span>
        <span>
          Trade fee: {postTradeDetails && formatUsd(postTradeDetails.fee)} ({feeType}{' '}
          {formatPercent(feeRate)})
        </span>
      </div>
    </Panel>
  )
})
