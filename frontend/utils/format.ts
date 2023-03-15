import { Dnum, format as dformat, from } from 'dnum'

export const formatNumber = (value: number, digits: number) => {
  const f = Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
  return f.format(value)
}

export const safeStringDnum = (value: string) => {
  if (!value) return from([0n, 0])
  const [whole, fraction] = value.split('.')
  const v = [whole || 0, fraction || 0].join('.')
  return from(v, 18)
}

export const format = (
  value: Dnum | number | string | undefined,
  digits: number | undefined = 2,
) => {
  if (!value) value = [0n, 0]
  if (typeof value === 'number') return formatNumber(value, digits || 2)
  if (typeof value === 'string') value = safeStringDnum(value)
  return dformat(value, { digits, trailingZeros: true })
}
