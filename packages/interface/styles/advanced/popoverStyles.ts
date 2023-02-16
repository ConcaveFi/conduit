import { cva } from 'class-variance-authority'

export const propoverPanelStyles = cva(cva('absolute mt-2 top-full')(), {
  variants: {
    origin: {
      top: 'origin-top',
      'top-right': 'origin-top-right',
      'top-left': 'origin-top-left',
      center: 'origin-center',
    },
  },
  defaultVariants: {
    origin: 'top',
  },
})
