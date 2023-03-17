import { cva } from 'class-variance-authority'

const baseStyles = cva(
  'flex px-3 justify-between font-medium  items-center w-full min-h-[30px] rounded-t-lg',
)
export const panelHeaderStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: ['bg-[#1F202980] border-coal border-b ocean:bg-ocean-500'],
      secondary: [
        'bg-[#1F202980] border-coal ocean:bg-ocean-500 border-b-2 ocean:border-ocean-400',
      ],
    },
  },
})

const baseBodyStyles = cva(['flex flex-col flex-grow rounded-b-lg'])
export const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: ['bg-coal-bright ocean:bg-ocean-500'],
      secondary: ['bg-[#1F202980] ocean:bg-ocean-700'],
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
