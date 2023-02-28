import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'
import { Text } from '../primitives/Text'

const alignStyles = cva(cva('')(), {
  variants: {
    align: {
      center: 'items-center',
      end: 'items-end',
      start: 'items-start',
    },
  },
  defaultVariants: {
    align: 'center',
  },
})
export interface ItemInfoProps {
  info: string
  value: string
  Icon?: ReactNode
  modifier?: 'positive' | 'negative' | 'none'
  align?: 'center' | 'end' | 'start'
}
export function ItemInfo({
  Icon,
  info,
  value,
  isLoading,
  align = 'start',
  modifier = 'none',
}: ItemInfoProps) {
  return (
    <div className="flex items-center gap-4 ">
      {Icon}
      <div className={`flex flex-col ${alignStyles({ align })}`}>
        <Text size="sm" variant="medium" weight="medium">
          {info}
        </Text>
        <Text className="-mt-1 " variant="heading" size="md" modifier={modifier}>
          {value}
        </Text>
      </div>
    </div>
  )
}
