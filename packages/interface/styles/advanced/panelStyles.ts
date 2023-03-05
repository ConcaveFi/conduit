import { cva } from 'class-variance-authority'

const baseStyles = cva('flex px-3 justify-between items-center w-full min-h-[2.25rem] rounded-t-lg')
export const panelHeaderStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: ['bg-light-100 border-light-300 ocean:bg-ocean-500 '],
      secondary: [
        'bg-light-100 border-light-300 ocean:bg-ocean-500 border-b-2 ocean:border-ocean-400',
      ],
    },
  },
})

const baseBodyStyles = cva(['flex flex-col flex-grow rounded-b-lg'])
export const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: [' bg-light-100 ocean:bg-ocean-500 '],
      secondary: ['bg-light-100 ocean:bg-ocean-700'],
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
