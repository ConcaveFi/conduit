import { cva } from 'class-variance-authority'

const baseStyles = cva('')
export const tbodyStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: '',
    },
  },
})
