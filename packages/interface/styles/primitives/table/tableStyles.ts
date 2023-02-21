import { cva } from 'class-variance-authority'

const baseStyles = cva('')
export const tableStyles = cva(baseStyles(), {
  variants: {
    left: { true: 'text-left', false: '' },
    right: { true: 'text-right', false: '' },
    center: { true: 'text-center', false: '' },
    justify: { true: 'text-justify', false: '' },
  },
})
