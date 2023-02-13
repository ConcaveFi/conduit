import { ReactNode } from 'react'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'

export interface ItemInfoProps {
  info: string
  value: string
  Icon?: ReactNode
  modifier?: 'positive' | 'negative' | 'none'
}
export function ItemInfo({ Icon, info, value, modifier = 'none' }: ItemInfoProps) {
  return (
    <Flex className="gap-4 items-center">
      {Icon}
      <Flex column>
        <Text size="sm" variant="medium" weight="medium">
          {info}
        </Text>
        <Text className="-mt-2" variant="heading" size="md" modifier={modifier}>
          {value}
        </Text>
      </Flex>
    </Flex>
  )
}
