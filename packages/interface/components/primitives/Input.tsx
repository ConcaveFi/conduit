import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveInputProps } from '../../types/primitives'

const baseStyles = cva('outline-none')
export const inputStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: 'bg-ocean-600 rounded-full placeholder:text-ocean-200',
      simple: 'text-gray-100 placeholder:text-gray-400 font-medium bg-transparent',
      'simple.high': 'text-ocean-100 placeholder:text-ocean-200  bg-transparent',
    },
  },
})
export type InputAttributes = VariantProps<typeof inputStyles>
export interface InputProps extends InputAttributes, PrimitiveInputProps {}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variant, className, ...inputProps } = props
  return (
    <input type="text" ref={ref} className={inputStyles({ className, variant })} {...inputProps} />
  )
})
