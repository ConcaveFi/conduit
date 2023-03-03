import { BigNumber, FixedNumber } from 'ethers'

export const safeFixedNumber = (value: string | FixedNumber) => {
  if (FixedNumber.isFixedNumber(value)) return value
  if (!value) return FixedNumber.from(0)

  const [whole, fraction] = value.split('.')
  const v = [whole, fraction?.slice(0, 18)].join('.')
  return FixedNumber.fromString(v || '0')
}

export const format = (value: FixedNumber | string, options?: Intl.NumberFormatOptions) => {
  if (typeof value === 'string') value = safeFixedNumber(value)
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
