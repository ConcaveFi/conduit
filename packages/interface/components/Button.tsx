import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveButtonProps } from '../types/primitives'

const baseStyles = cva('flex gap-1 items-center justify-center font-medium')
export const buttonStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: 'bg-ocean-700 rounded-full hover:bg-ocean-500 text-ocean-200 fill-ocean-200',
      'bottom-glow':
        'border-b-2 border-ocean-100 text-ocean-100 bg-gradient-to-b from-[#0000] to-[#00D1FF50]',
      underline: 'text-ocean-200 hover:underline ',
    },
    isEnabled: { true: '', false: '' },
    size: {
      md: 'px-3 py-2',
      lg: 'px-5 py-[8px]',
    },
  },
})
export type ButtonAttributes = VariantProps<typeof buttonStyles>
export interface ButtonProps extends PrimitiveButtonProps, ButtonAttributes {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, size, className, ...buttonProps } = props
  return (
    <button ref={ref} className={buttonStyles({ className, size, variant })} {...buttonProps} />
  )
})
