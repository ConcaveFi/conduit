'use client'

import { cx } from '@tradex/interface'
import * as Slider from '@tradex/interface/components/primitives/Slider'
import { useCurrentTradePreview } from 'app/[asset]/lib/useTradePreview'
import { equal, toNumber } from 'dnum'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import NumberEasing from 'react-number-easing'
import { format } from 'utils/format'
import { useMarginDetails } from './MarginDetails'
import { orderSizeUsdAtom } from './OrderFormPanel'
import { InputState, orderInputAtom } from './OrderSizeInput'
import { sideAtom } from './SideSelector'

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
      disabled={!max || disabled}
      value={[value > max ? max : value]}
      step={0.5}
      max={max || 1}
      onValueChange={handleSizeSlider}
      className="relative flex w-full touch-none select-none items-center"
    >
      <Slider.Track
        aria-disabled={disabled}
        className={cx(
          'h-1 flex-1 rounded-full',
          'aria-enabled:bg-gradient-to-r from-green-400 via-yellow-400 to-red-400',
          'aria-disabled:bg-dark-20 ocean:aria-disabled:bg-blue-20',
        )}
      />
      <Slider.Thumb asChild>
        <motion.span
          aria-disabled={disabled}
          className={cx(
            'box-4 bg-dark-20 ocean:bg-blue-20 block rounded-full border-2 outline-none ',
            'transition-all duration-300 ease-out will-change-transform focus:transition-none',
            'aria-disabled:border-dark-30 ocean:aria-disabled:border-blue-30',
          )}
          style={{ borderColor: disabled ? '' : borderColor }}
        />
      </Slider.Thumb>
    </Slider.Root>
  )
}

function LiquidationSlider() {
  const { data: buyingPower = 0 } = useMarginDetails((details) => toNumber(details.buyingPower, 2))

  const onChange = useSetAtom(orderInputAtom)
  const size = usePositionSizeForLiquidation()

  return (
    <>
      <SizeSlider value={size} max={buyingPower} onChange={onChange} disabled={!buyingPower} />
      <div className="flex justify-between font-mono">
        <span
          className={cx(
            'text-xs',
            buyingPower ? 'text-green-500' : 'text-dark-30 ocean:text-blue-30',
          )}
        >
          $0
        </span>
        {!!buyingPower && <span className="text-xs text-orange-500">$ {format(buyingPower)}</span>}
      </div>
    </>
  )
}

function LiquidationPrice() {
  const { data } = useCurrentTradePreview()
  return (
    <span
      className={cx(
        'min-w-0 overflow-ellipsis font-mono text-xl outline-none',
        !data || equal(data.liquidationPrice, 0) ? 'text-dark-30 ocean:text-blue-30' : 'text-white',
      )}
    >
      $
      <NumberEasing
        value={data ? toNumber(data.liquidationPrice, 2) : 0}
        decimals={2}
        ease="cubicInOut"
      />
    </span>
  )
}

function usePositionSizeForLiquidation() {
  // account in position + order form input values
  const { data: inPositionUsd = 0 } = useMarginDetails((details) =>
    toNumber(details.notionalValue, 2),
  )
  const sizeUsd = useAtomValue(orderSizeUsdAtom)
  const side = useAtomValue(sideAtom)
  const size = side === 'long' ? sizeUsd : -sizeUsd

  return size + inPositionUsd
}

const riskLevelLabel = (value: number, max: number, remainingMargin: number) => {
  if (!remainingMargin || !value || value < remainingMargin) return 'NONE'
  if (value <= max * 0.25) return 'LOW'
  if (value <= max * 0.75) return 'MEDIUM'
  return 'HIGH'
}

function LiquidationPriceRisk() {
  const { data: buyingPower = 0 } = useMarginDetails((details) => toNumber(details.buyingPower, 2))
  const { data: remainingMargin = 0 } = useMarginDetails((details) =>
    toNumber(details.remainingMargin, 2),
  )

  const size = usePositionSizeForLiquidation()

  const color = useInterpolateLiquidationRiskColor(size, buyingPower)
  const riskLabel = riskLevelLabel(size, buyingPower, remainingMargin)

  return (
    <>
      <LiquidationPrice />
      <motion.span
        style={{ color: riskLabel === 'NONE' ? undefined : color }}
        className="text-dark-30 ocean:text-blue-30 font-bold"
      >
        {riskLabel}
      </motion.span>
    </>
  )
}

export function LiquidationInfo() {
  return (
    <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <div className="flex justify-between">
        <span className="ocean:text-blue-accent text-dark-accent text-xs">Liquidation Price:</span>
        <span className="ocean:text-blue-accent text-dark-accent text-xs">Risk Level</span>
      </div>
      <div className="flex flex-col gap-2 font-mono">
        <div className="flex h-7 items-center justify-between">
          <LiquidationPriceRisk />
        </div>
        <LiquidationSlider />
      </div>
    </div>
  )
}
