import { cva } from 'class-variance-authority'

const baseStyles = cva('')
export const theadStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: 'border-b-2 border-ocean-300 border-opacity-40',
    },
  },
})
