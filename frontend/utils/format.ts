import { Dnum, format as dformat, from } from 'dnum'
import { BigNumberish } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

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

const fixParams = (params: { decimals?: number; places?: number }) => ({
  places: params.places !== undefined ? params.places : 2,
  decimals: params.decimals !== undefined ? params.decimals : 18,
})
const formatter = Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 4 })
export const compactFormat = (bigNumber: BigNumberish, params: { decimals?: number } = {}) => {
  if (!bigNumber) return 'Nan'
  const { decimals } = fixParams(params)
  const input = formatUnits(bigNumber, decimals)
  if (+input < 0.01 && +input > 0) {
    return `<0.01`
  }
  return formatter.format(+input)
}
