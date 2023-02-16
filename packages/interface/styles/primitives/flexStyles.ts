import { cva } from 'class-variance-authority'

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
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      start: 'justify-start',
    },
  },
  defaultVariants: { row: true },
})
