import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveButtonProps } from '../../types/primitives'

const baseStyles = cva('flex gap-1 font-medium')
export const buttonStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: 'bg-ocean-700 rounded-full hover:bg-ocean-500 text-ocean-200 fill-ocean-200',
      secondary: 'bg-ocean-500 rounded-full hover:bg-ocean-400 text-ocean-200 fill-ocean-200',
      'secondary.underline':
        'border-2 border-ocean-300 rounded-full hover:bg-ocean-500 text-ocean-200 fill-ocean-200',
      'green-gradient': 'bg-green-gradient rounded-full',
      'bottom-glow':
        'border-b-2 border-ocean-100 text-ocean-100 bg-gradient-to-b from-[#0000] to-[#00D1FF50]',
      underline: 'text-ocean-200 hover:underline ',
      'underline.secondary': 'text-ocean-300 hover:underline ',
    },
    centered: { true: 'items-center justify-center' },
    isEnabled: { true: '', false: '' },
    size: {
      sm: 'px-2 !rounded-md min-w-[70px]',
      md: 'px-3 w-fit min-w-[100px]',
      lg: 'px-5 py-1 w-fit min-w-[140px]',
      xl: 'h-10 w-full',
    },
  },
  defaultVariants: {
    centered: true,
  },
})
export type ButtonAttributes = VariantProps<typeof buttonStyles>
export interface ButtonProps extends PrimitiveButtonProps, ButtonAttributes {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, size, className, centered, ...buttonProps } = props
  return (
    <button
      ref={ref}
      className={buttonStyles({ className, size, centered, variant })}
      {...buttonProps}
    />
  )
}) as React.FC<ButtonProps>
