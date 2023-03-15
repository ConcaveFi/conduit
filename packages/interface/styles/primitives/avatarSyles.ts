import { cva } from 'class-variance-authority'

const baseStyles = cva('outline-none')
const defaultVariants = {
  variant: 'blue',
  size: 'base',
} as const
export const avatarStyles = cva(baseStyles(), {
  variants: {
    variant: {
      icon: '',
      blue: 'bg-Blue/main-dim outline outline-4 outline-[#3e538940]',
      red: 'bg-red-600 outline outline-4 outline-[#E4364B40]',
      green:
        'bg-gradient-to-bl from-teal-400 via-teal-400 to-cyan-400 outline  outline-4 outline-[#34edb340]',
    },
    size: {
      sm: 'h-6 w-6',
      base: 'h-8 w-8',
      lg: 'h-12 w-12',
    },
  },
  defaultVariants,
})
