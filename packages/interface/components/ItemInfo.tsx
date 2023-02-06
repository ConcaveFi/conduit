import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'
import { Flex } from './Flex'
import { Text } from './Text'

const baseStyles = cva('flex ')

export interface ItemInfoProps {
  info: string
  value: string
  Icon?: ReactNode
  modifier?: 'positive' | 'negative' | 'none'
}
export function ItemInfo({ Icon, info, value, modifier = 'none' }: ItemInfoProps) {
  return (
    <Flex className="gap-1 items-center">
      {Icon}
      <Flex column>
        <Text size="sm" variant="medium" weight="medium">
          {info}
        </Text>
        <Text className="-mt-2" variant="heading" modifier={modifier}>
          {value}
        </Text>
      </Flex>
    </Flex>
  )
}
