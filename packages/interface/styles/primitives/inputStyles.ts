import { cva } from 'class-variance-authority'

const baseStyles = cva('outline-none')
const defaultVariants = {
  variant: 'primary',
  size: 'sm',
} as const
export const containerStyles = cva(baseStyles(), {
  variants: {
    variant: {
      none: '',
      primary: 'bg-Blue/chart-ng flex  text-base gap-1 h-fit rounded-full px-4 py-3 font-mono',
      simple: '',
      'simple.high': '',
    },
  },
  defaultVariants,
})

export const inputStyle = cva(baseStyles(), {
  variants: {
    variant: {
      none: '',
      primary: 'bg-Blue/chart-ng w-full leading-none text-white',
      simple: 'text-gray-100 placeholder:text-gray-400 font-medium bg-transparent',
      'simple.high':
        'text-ocean-800 ocean:text-ocean-100 ocean:placeholder:text-ocean-200  bg-transparent',
    },
  },
  defaultVariants,
})

export const svgIconStyle = cva(baseStyles(), {
  variants: {
    variant: {
      none: '',
      primary: 'stroke-Blue/main-dim text-blue-blue text-sm hover:underline w-fit ',
      simple: '',
      'simple.high': '',
    },
    size: {
      sm: 'h-4 w-4',
    },
  },
  defaultVariants,
})

type Params = Parameters<typeof inputStyle>[0]
export const inputStyles = (params: Params) => {
  const input = inputStyle(params)
  const container = containerStyles(params)
  const icon = svgIconStyle(params)
  return {
    input,
    container,
    icon,
  }
}
