import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveSpanProps } from '../types/primitives'

export const textStyles = cva(cva('text-jus')(), {
  variants: {
    variant: {
      heading: 'font-semibold text-lg text-white',
      high: 'text-ocean-100',
      medium: 'text-ocean-200',
      low: 'text-ocean-300 font-medium',
      positive: 'text-green-400',
      negative: 'text-red-400',
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
  const { variant, className, ...spanProps } = props
  return <span ref={ref} className={textStyles({ className, variant })} {...spanProps}></span>
})
