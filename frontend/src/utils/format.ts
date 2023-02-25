import { FixedNumber } from 'ethers'

export const format = (value: FixedNumber | string, options?: Intl.NumberFormatOptions) => {
  if (typeof value === 'string') value = FixedNumber.from(value || 0)
  const f = Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 3,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    // @ts-ignore roundingPriority is experimental
    roundingPriority: 'morePrecision',
    ...options,
  })
  return f.format(value.toUnsafeFloat())
}

export const formatUsd = (value: FixedNumber | string) =>
  format(value, { style: 'currency', currency: 'usd', currencyDisplay: 'narrowSymbol' })

export const formatPercent = (value: FixedNumber | string) => format(value, { style: 'percent' })
