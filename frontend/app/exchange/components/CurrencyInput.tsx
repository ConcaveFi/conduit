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
    <div className="flex w-full items-end gap-2">
      <div className="flex w-full flex-col">
        <span className="text-dark-30 ocean:text-blue-accent mb-1 ml-3 text-sm ">{label} </span>
        <NumericInput
          className="w-full"
          decimalScale={6}
          variant={'primary'}
          bottom={({ className }) => (
            <p className={`${className} text-dark-30 ocean:text-blue-30 text-xs`}>
              ${price.amountPrice || 0}
            </p>
          )}
          {...inputProps}
        />
        {children}
      </div>
      <CurrencySelector currency={inputProps.currency} disabled onSelect={setCurrency} />
    </div>
  )
}
