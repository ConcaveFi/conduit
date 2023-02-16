import { cva } from 'class-variance-authority'

export const textStyles = cva(cva('')(), {
  variants: {
    variant: {
      heading: 'font-semibold text-white',
      'heading.light': 'text-lg text-white',
      high: 'text-ocean-100',
      medium: 'text-ocean-200',
      low: 'text-ocean-300 font-medium',
      positive: 'text-[#32FF2E]',
      negative: 'text-[#FF2E2E]',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    modifier: {
      positive: '!text-[#32FF2E]',
      negative: '!text-[#FF2E2E]',
      none: '',
    },
    align: {
      justify: 'text-justify',
      center: 'text-center',
      start: 'text-start',
      end: 'text-end',
    },
  },
  defaultVariants: {
    variant: 'high',
  },
})
