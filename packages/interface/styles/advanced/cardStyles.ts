import { cva } from 'class-variance-authority'

export const cardStyles = cva(cva('shadow-xl rounded-lg ')(), {
  variants: {
    variant: {
      primary: 'bg-ocean-800 border-2 border-ocean-400',
      'primary.clean': 'bg-ocean-800',
      secondary: 'bg-ocean-500 border-2 border-ocean-300 border-opacity-60',
      'secondary.clean': 'bg-ocean-500 ',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
