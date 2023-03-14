import { Dnum, format as dformat, from, isDnum } from 'dnum'

// export const safeFixedNumber = (value: string | FixedNumber) => {
//   if (FixedNumber.isFixedNumber(value)) return value
//   if (!value) return FixedNumber.from(0)

//   const [whole, fraction] = value.split('.')
//   const v = [whole, fraction?.slice(0, 18)].join('.')
//   return FixedNumber.fromString(v || '0')
// }

export const formatNumber = (value: number, digits: number) => {
  const f = Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
  return f.format(value)
}

export const dn = (value: string | Dnum) => {
  if (isDnum(value)) return value
  if (!value) return from([0n, 0])
  const [whole, fraction] = value.split('.')
  const v = [whole || 0, fraction || 0].join('.')
  return from(v, 18)
}

export const format = (value: Dnum | number | string | undefined, digits: number | false = 2) => {
  if (!value) value = [0n, 0]
  if (typeof value === 'number') return formatNumber(value, digits || 2)
  if (typeof value === 'string') value = dn(value)
  return dformat(value, digits || undefined)
}

// export const formatUsd = (value: string, options?: Intl.NumberFormatOptions) =>
//   format(value, { style: 'currency', currency: 'usd', currencyDisplay: 'narrowSymbol', ...options })

// export const formatPercent = (value: Dnum | string) => format(value, { style: 'percent' })
