import { formatUnits } from 'ethers/lib/utils'

export const format = (
  amount: bigint | number,
  decimals: bigint | number,
  options?: Intl.NumberFormatOptions,
) => {
  const f = Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 6,
    minimumSignificantDigits: 3,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...options,
  })
  return f.format(+formatUnits(amount, decimals))
}
