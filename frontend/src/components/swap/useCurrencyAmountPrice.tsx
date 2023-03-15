import { CurrencyAmount } from '@tradex/core'
import { parseUnits } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { compactFormat } from 'src/utils/format'
import { useCoingeckoPrice } from './useCoingeckoPrice'

export const useCurrencyAmountPrice = ({ currencyAmount }: { currencyAmount: CurrencyAmount }) => {
  const price = useCoingeckoPrice({ contractAddress: currencyAmount.address, chainId: 10 })
  const [amountPrice, setAmountPrice] = useState('')

  useEffect(() => {
    const otherPrice = parseUnits((price?.data || 0)?.toString(), currencyAmount.decimals)
    const compactValue = compactFormat(otherPrice.mul(currencyAmount.value).div(10n ** 18n))
    setAmountPrice(compactValue)
  }, [price.data, currencyAmount.value, currencyAmount.decimals, currencyAmount.address])
  return {
    ...price,
    amountPrice,
  }
}
