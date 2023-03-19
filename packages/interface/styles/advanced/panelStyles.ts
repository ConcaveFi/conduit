import { cva, cx } from 'class-variance-authority'

export const panelHeaderStyles = cx(
  'flex px-3 justify-between font-medium  items-center w-full min-h-[30px] rounded-t-lg',
  'bg-dark-20 border-dark-30 border-b ocean:bg-blue-20 ocean:border-blue-30',
)

const baseBodyStyles = cva(['flex flex-col flex-grow rounded-b-lg'])
export const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: ['bg-dark-20 ocean:bg-ocean-500'],
      secondary: ['bg-dark-10 ocean:bg-ocean-700'],
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
