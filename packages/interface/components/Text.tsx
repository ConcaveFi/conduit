import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveSpanProps } from '../types/primitives'

export const textStyles = cva(cva('text-jus ')(), {
  variants: {
    variant: {
      heading: 'font-semibold text-white',
      'heading.light': 'text-lg text-white',
      high: 'text-ocean-100',
      medium: 'text-ocean-200',
      low: 'text-ocean-300 font-medium',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-[14px]',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    modifier: {
      positive: 'text-[#32FF2E]',
      negative: 'text-[#FF2E2E]',
      none: '',
    },
    align: {
      justify: 'text-justify',
      center: 'text-center',
      start: 'text-start',
      end: 'text-end',
    },
  },
  defaultVariants: {
    variant: 'high',
  },
})
export type TextAttributes = VariantProps<typeof textStyles>
export interface TextProps extends TextAttributes, PrimitiveSpanProps {}
export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { variant, className, modifier, size, weight, ...spanProps } = props
  return (
    <span
      ref={ref}
      className={textStyles({ className, variant, modifier, size, weight })}
      {...spanProps}
    ></span>
  )
})
