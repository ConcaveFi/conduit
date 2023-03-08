import * as Slider from '@radix-ui/react-slider'
import { NumericInput, Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
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
        className={`btn centered flex-1 rounded-lg py-2 ${
          side === 'long' ? 'btn-green-gradient' : 'btn-down'
        }`}
      >
        {t('long')}
      </button>
      <button
        onClick={() => onChange('short')}
        className={`centered btn flex-1 rounded-lg py-2 ${
          side === 'short' ? 'btn-red-gradient' : 'btn-down'
        }`}
      >
        {t('short')}
      </button>
    </div>
  )
}

function SizeSlider({
  value,
  max,
  onChange,
}: {
  value: string
  max?: string
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
      className="relative flex h-[20px] w-full touch-none select-none items-center"
    >
      <Slider.Track className="bg-ocean-600 relative h-[3px] flex-1 rounded-full" />
      <Slider.Thumb className="box-[15px] bg-ocean-200 block rounded-full transition-all duration-300 ease-out hover:scale-125" />
    </Slider.Root>
  )
}

export const OrderSizeInput = ({
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

  return (
    <div className="flex w-full max-w-full flex-col gap-1">
      <span className="text-light-400 text-xs">Order Size</span>
      <div className="flex h-[60px] w-full max-w-full justify-between">
        <div className="flex min-w-0 flex-col">
          <NumericInput
            className="text-light-200 placeholder:text-ocean-200 min-w-0 text-ellipsis bg-transparent text-xl font-bold outline-none"
            placeholder="0.00"
            value={inputs[amountDenominator].toString()}
            onValueChange={({ value }, { source }) => {
              if (source === 'event') onChange({ value, type: amountDenominator })
            }}
          />
          <div className="h-4">
            <NumericInput
              className="text-ocean-200 w-min min-w-0 text-ellipsis bg-transparent text-sm font-medium outline-none"
              value={inputs[other].toString()}
              onValueChange={({ value }, { source }) => {
                if (source === 'event') onChange({ value, type: other })
              }}
            />
            <span className="text-ocean-200 ml-0.5 text-sm">{inputs[other] && symbols[other]}</span>
          </div>
        </div>
        <button
          onClick={toggleAmountDenominator}
          className="text-ocean-200 hover:bg-light-800 mb-auto rounded-xl px-3 py-1 text-sm font-medium"
        >
          {symbols[amountDenominator]}
        </button>
      </div>
      <SizeSlider max={max} onChange={onChange} value={inputs.usd.toString()} />
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
      : undefined

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
    buyingPower && (sizeUsd.isZero() ? FixedNumber.from(1) : sizeUsd).divUnsafe(buyingPower)

  console.log(market)

  return (
    <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
      <TransferMarginButton asset={market?.asset} />

      {address && <BuyingPowerInfo account={address} market={market} />}

      <div className="flex max-w-full flex-col">
        <OrderSizeInput
          inputs={inputs}
          onChange={setInput}
          max={buyingPower?.toString()}
          assetSymbol={market.asset}
        />
      </div>

      <SideSelector side={side} onChange={setSide} />

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

      <button
        onClick={submitOrder}
        disabled={!submitOrder}
        className="btn btn-green-gradient skeleton centered h-16 rounded-lg text-xl "
      >
        {t('place order')}
      </button>
    </Panel>
  )
})
