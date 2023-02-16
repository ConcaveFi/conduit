import { cva } from 'class-variance-authority'

const baseStyles = cva('flex px-3 justify-between items-center w-full min-h-[2.25rem]')
export const panelHeaderStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 border-b-2 border-opacity-40 border-ocean-300'],
      secondary: ['bg-ocean-600 border-b-2 border-ocean-400'],
    },
  },
})

const baseBodyStyles = cva(['flex flex-col flex-grow'])
export const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 '],
      secondary: ['bg-ocean-700'],
    },
    spacing: {
      sm: 'gap-2 p-2',
      md: 'gap-4 p-5',
      none: '',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})
