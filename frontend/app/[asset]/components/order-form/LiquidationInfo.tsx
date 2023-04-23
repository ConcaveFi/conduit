'use client'

import { cx } from '@tradex/interface'
import * as Slider from '@tradex/interface/components/primitives/Slider'
import { useCurrentTradePreview } from 'app/[asset]/lib/useTradePreview'
import { equal, lessThan, toNumber } from 'dnum'
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
  return useTransform(v, [max, max / 2, 0], ['#98AA29', '#20B881', '#539FCA'])
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
          'aria-enabled:bg-gradient-to-r from-[#539FCA] via-[#20B881] to-[#98AA29]',
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
            buyingPower ? 'text-[#539FCA]' : 'text-dark-30 ocean:text-blue-30',
          )}
        >
          $0
        </span>
        {!!buyingPower && <span className="text-xs text-[#98AA29]">$ {format(buyingPower)}</span>}
      </div>
    </>
  )
}

function LiquidationPrice() {
  const { data } = useCurrentTradePreview()
  const liquidationPrice = toNumber(data?.liquidationPrice || [0n, 0], 2)
  const entryPrice = toNumber(data?.entryPrice || [0n, 0], 2)
  const percent = liquidationPrice && ((liquidationPrice - entryPrice) / entryPrice) * 100
  const color = useInterpolateLiquidationRiskColor(5, Math.abs(percent))

  return (
    <span
      className={cx(
        'min-w-0 overflow-ellipsis font-mono text-xl outline-none',
        equal(liquidationPrice, 0) ? 'text-dark-30 ocean:text-blue-30' : 'text-white',
      )}
    >
      $
      <NumberEasing value={liquidationPrice} decimals={2} ease="cubicInOut" />
      <motion.span
        style={{ color: entryPrice === 0 ? undefined : color }}
        className="text-dark-30 ocean:text-blue-30 ml-1 text-sm"
      >
        (<NumberEasing value={percent} decimals={2} ease="cubicInOut" />
        %)
      </motion.span>
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

  return Math.abs(size + inPositionUsd)
}

function InsufficientMargin() {
  return (
    <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex w-full max-w-full flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all">
      <span className="ocean:text-blue-accent text-dark-accent text-xs font-bold">
        Insufficient margin
      </span>
      <span className="ocean:text-blue-30 text-dark-30 text-xs">
        You need at least 50 sUsd margin
      </span>
    </div>
  )
}

export function LiquidationInfo() {
  const { data: margin } = useMarginDetails((m) => m.remainingMargin)

  if (margin && lessThan(margin, 50)) return <InsufficientMargin />

  return (
    <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex w-full max-w-full flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all">
      <span className="ocean:text-blue-accent text-dark-accent text-xs">Liquidation Price</span>
      <div className="h-8">
        <LiquidationPrice />
      </div>
      <div className="flex w-full flex-col gap-2 font-mono">
        <LiquidationSlider />
      </div>
    </div>
  )
}
