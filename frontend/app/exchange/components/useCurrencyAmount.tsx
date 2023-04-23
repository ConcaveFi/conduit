import { Currency } from '@tradex/core'
import { BigNumber } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { useMemo, useState } from 'react'

export const useCurrencyAmount = (options: { currency: Currency }) => {
  const [currency, setCurrency] = useState<Currency>(options.currency)
  const [formattedValue, setFormattedValue] = useState('')
  const value = useMemo(() => {
    if (+`0${formattedValue}` === 0) return BigNumber.from(0)
    return parseUnits(formattedValue, currency.decimals)
  }, [formattedValue, currency.decimals])

  return {
    ...currency,
    formattedValue,
    value,
    setCurrency,
    setValue: (big: BigNumber) => {
      const value = big.eq(0) ? '' : formatUnits(big, currency.decimals)
      setFormattedValue(value)
    },
    setFormattedValue,
  }
}
