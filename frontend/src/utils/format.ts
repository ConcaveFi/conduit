import { utils } from 'ethers'

export const format = (
  amount: bigint,
  decimals: bigint | number,
  options?: Intl.NumberFormatOptions,
) => {
  const f = Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 6,
    minimumSignificantDigits: 3,
    ...options,
  })
  return f.format(+utils.formatUnits(amount, decimals))
}
