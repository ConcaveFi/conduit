import { cva } from 'class-variance-authority'

const baseStyles = cva('outline-none ')
export const inputStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: 'bg-ocean-600 rounded-full placeholder:text-ocean-200',
      simple: 'text-gray-100 placeholder:text-gray-400 font-medium bg-transparent',
      'simple.high': 'text-ocean-100 placeholder:text-ocean-200  bg-transparent',
    },
  },
})
