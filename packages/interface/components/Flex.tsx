import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveDivProps } from '../types/primitives'
const baseStyles = cva([`flex`])

export const flexStyles = cva(baseStyles(), {
  variants: {
    centered: { true: 'justify-center items-center', false: '' },
    row: { true: 'flex-row', false: '' },
    column: { true: 'flex-col', false: '' },
    grow: { true: 'flex-grow', false: '' },
    align: {
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
      start: 'items-start',
    },
    justify: {
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      start: 'justify-start',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    row: true,
  },
})

export type FlexAttributes = VariantProps<typeof flexStyles>
export interface FlexProps extends PrimitiveDivProps, FlexAttributes {}

export const Flex = forwardRef<any, FlexProps>((props, ref) => {
  const { row, column, centered, grow, justify, align, className = '', ...divProps } = props
  if (props.hidden) return <></>
  return (
    <div
      ref={ref}
      className={`${flexStyles({ centered, column, row, grow, justify, align, className })} `}
      {...divProps}
    />
  )
})
