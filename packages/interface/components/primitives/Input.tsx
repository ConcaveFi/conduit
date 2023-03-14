import { VariantProps } from 'class-variance-authority'
import { inputStyles } from '../../styles/primitives/inputStyles'
import { PrimitiveInputProps } from '../../types/primitives'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { twMerge } from 'tailwind-merge'

export type InputAttributes = VariantProps<typeof inputStyles> & {
  left?: (prop: { className?: string }) => JSX.Element
  right?: (prop: { className?: string }) => JSX.Element
  bottom?: (prop: { className?: string }) => JSX.Element
}
export type InputProps = InputAttributes & PrimitiveInputProps

export const Input = ({ left, right, bottom, className, variant, ...inputProps }: InputProps) => {
  const _styles = inputStyles({ variant })
  return (
    <div className={_styles.container}>
      {!left ? null : (
        <div className="flex flex-col justify-center">{left({ className: _styles.icon })}</div>
      )}
      <div className="flex w-full flex-col">
        <input {...inputProps} className={twMerge(_styles.input, className)} />
        {bottom ? bottom({ className: 'ml-1 -mb-1 mt-0.5 leading-none' }) : null}
      </div>
      {!right ? (
        <></>
      ) : (
        <div className="leading-0 flex flex-col justify-center">
          {right({ className: _styles.icon })}
        </div>
      )}
    </div>
  )
}

export type NumericInputProps = InputProps & NumericFormatProps
export const NumericInput = (props: NumericInputProps) => {
  return (
    <NumericFormat
      customInput={Input}
      inputMode="decimal"
      allowedDecimalSeparators={['.', ',']}
      thousandsGroupStyle="thousand"
      valueIsNumericString
      thousandSeparator
      allowLeadingZeros
      allowNegative={false}
      {...props}
    />
  )
}
