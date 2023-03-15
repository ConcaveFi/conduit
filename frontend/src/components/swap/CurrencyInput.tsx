import { Currency, CurrencyAmount } from '@tradex/core'
import { NumericInput } from '@tradex/interface'
import { CurrencySelector } from './CurrencySelector'
import { useCurrencyAmountPrice } from './useCurrencyAmountPrice'

export const useExchangeInput = ({
  currency,
  setCurrency,
  setFormattedValue,
}: {
  currency: CurrencyAmount
  setCurrency: (currency: Currency) => void
  setFormattedValue: (value: string) => void
}) => {
  const value = currency.formattedValue
  const onValueChange = ({ floatValue }, eventSrc) => {
    if (eventSrc.source !== 'event') return
    if (floatValue < 0) return
    const amount: string = floatValue ? floatValue.toString() : ''
    setFormattedValue(amount)
  }
  return {
    currency,
    value,
    placeholder: '0.00',
    setCurrency,
    onValueChange,
  }
}

export type InputProps = ReturnType<typeof useExchangeInput>

export const SwapInput = ({
  label,
  children = <></>,
  setCurrency,
  ...inputProps
}: {
  disabled?: boolean
  children?: JSX.Element
  right?: (prop: { className?: string }) => JSX.Element
  label: string
} & InputProps) => {
  const price = useCurrencyAmountPrice({ currencyAmount: inputProps.currency })
  return (
    <div className="flex gap-2 items-end">
      <div className="flex w-full flex-col  ">
        <span className="text-blue-blue ml-3 mb-1 text-sm ">{label} </span>
        <NumericInput
          className="w-60"
          decimalScale={6}
          variant={'primary'}
          bottom={({ className }) => (
            <p className={`${className} text-Blue/main-dim text-xs `}>${price.amountPrice || 0}</p>
          )}
          {...inputProps}
        />

        {children}
      </div>
      <CurrencySelector currency={inputProps.currency} disabled onSelect={setCurrency} />
    </div>
  )
}
