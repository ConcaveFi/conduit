import { EllipsisLoader } from '@tradex/icons'
import { ReactNode } from 'react'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'

export interface ItemInfoProps {
  info: string
  value: string
  Icon?: ReactNode
  modifier?: 'positive' | 'negative' | 'none'
  align?: 'center' | 'end' | 'baseline' | 'stretch' | 'start'
  isLoading?: boolean
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
    <Flex className="items-center gap-4">
      {Icon}
      <Flex column align={align}>
        <Text size="sm" variant="medium" weight="medium">
          {info}
        </Text>
        {!isLoading && (
          <Text className="-mt-1 " variant="heading" size="md" modifier={modifier}>
            {value}
          </Text>
        )}
        {isLoading && (
          <div className="flex items-center gap-2">
            <span className="text-white">Loading</span>
            <EllipsisLoader className="h-5 w-7 fill-white" />
          </div>
        )}
      </Flex>
    </Flex>
  )
}
