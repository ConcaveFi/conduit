import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

const styles = cva(cva('')(), {
  variants: {
    align: {
      center: 'items-center',
      end: 'items-end',
      start: 'items-start',
    },
    modifier: {
      positive: 'text-positive',
      negative: 'text-negative',
      none: 'text-light-600 ocean:text-white ',
    },
  },
  defaultVariants: {
    align: 'center',
    modifier: 'none',
  },
})
export interface ItemInfoProps {
  info: string
  value: string
  Icon?: ReactNode
  modifier?: 'positive' | 'negative' | 'none'
  align?: 'center' | 'end' | 'start'
}
export function ItemInfo({ Icon, info, value, align = 'start', modifier }: ItemInfoProps) {
  return (
    <div className="flex items-center gap-4 ">
      {Icon}
      <div className={`flex flex-col ${styles({ align })}`}>
        <span className="text-light-500 ocean:text-ocean-200 whitespace-nowrap text-sm font-medium">
          {info}
        </span>
        <span
          className={`-mt-1 whitespace-nowrap font-semibold sm:text-xs md:text-sm xl:text-[16px] ${styles(
            {
              modifier,
            },
          )}`}
        >
          {value}
        </span>
      </div>
    </div>
  )
}
