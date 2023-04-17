import { CurrencyAmount } from '@tradex/core'
import { parseUnits } from 'ethers/lib/utils'
import { compactFormat } from 'utils/format'
import { useCoingeckoPrice } from './useCoingeckoPrice'

export const useCurrencyAmountPrice = ({ currencyAmount }: { currencyAmount: CurrencyAmount }) => {
  const price = useCoingeckoPrice({ contractAddress: currencyAmount.address, chainId: 10 })
  const otherPrice = parseUnits((price?.data || 0)?.toString(), currencyAmount.decimals)
  const amountPrice = compactFormat(otherPrice.mul(currencyAmount.value).div(10n ** 18n))
  return {
    ...price,
    amountPrice,
  }
}
