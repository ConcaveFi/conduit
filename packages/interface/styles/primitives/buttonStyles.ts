import { cva } from 'class-variance-authority'

export const BUTTON_VARIANTS = {
  primary: 'bg-ocean-700 rounded-full hover:bg-ocean-500 text-ocean-200 fill-ocean-200',
  'primary.outline':
    'border-2 border-ocean-500 text-ocean-200 disabled:text-ocean-300 fill-ocean-200',
  secondary: 'bg-ocean-500 rounded-full hover:bg-ocean-400 text-ocean-200 fill-ocean-200',
  'secondary.underline':
    'border-2 border-ocean-300 rounded-full hover:bg-ocean-600 transition-all  text-ocean-200 fill-ocean-200',
  'green-gradient': 'bg-green-gradient rounded-full',
  'red-gradient': 'bg-red-gradient rounded-full',
  'bottom-glow':
    'border-b-2 border-ocean-100 text-ocean-100 bg-gradient-to-b from-[#0000] to-[#00D1FF50]',
  underline: 'text-ocean-200 hover:underline ',
  'underline.secondary': 'text-ocean-300 hover:underline ',
  down: 'rounded-lg bg-ocean-600 text-gray-300',
  positive: 'rounded-lg bg-teal-300',
  negative: 'rounded-lg bg-red-300',
}
export const BUTTON_SIZES = {
  sm: 'px-2 !rounded-md min-w-[70px]',
  md: 'px-3 w-fit min-w-[100px]',
  lg: 'px-5 py-1 w-fit min-w-[140px]',
  xl: 'h-10 w-full',
}

const baseStyles = cva('flex gap-1 font-medium ')
export const buttonStyles = cva(baseStyles(), {
  variants: {
    centered: { true: 'items-center justify-center' },
    isEnabled: { true: '', false: '' },
    variant: BUTTON_VARIANTS,
    size: BUTTON_SIZES,
  },
  defaultVariants: { centered: true },
})
