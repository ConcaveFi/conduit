import { cva } from 'class-variance-authority'

const baseStyles = cva('')
export const containerStyles = cva(baseStyles(), {
  variants: {
    expand: {
      width: 'w-full',
      height: 'h-full',
      all: 'w-full h-full',
    },
    space: {
      spaceless: 'p-2 gap-2',
      medium: 'p-4 gap-3',
      'medium.eq': 'p-4 gap-4',
      large: 'p-6 gap-3',
      'large.eq': 'p-6 gap-6',
      spacius: 'p-8 gap-5',
      'spacius.eq': 'p-8 gap-8',
      xspacius: 'p-12 gap-8',
      'xspacius.eq': 'p-12 gap-12',
    },
  },
})
