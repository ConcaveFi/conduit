import { cva } from 'class-variance-authority'

export const cardStyles = cva(cva('shadow-xl rounded-lg ')(), {
  variants: {
    variant: {
      primary: 'bg-ocean-800 border-2 border-ocean-400',
      'primary.clean': 'bg-ocean-800',
      secondary: 'bg-ocean-500 border-2 border-ocean-300 border-opacity-60',
      'secondary.clean': 'bg-ocean-500 ',
      glass:
        'bg-[#1A224CCC] backdrop-blur-[4px] shadow-[0px_18px_29px_rgba(8,8,30,0.43)] border-2 border-[#202959]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
