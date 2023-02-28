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
      {Icon && isLoading && (
        <div className=" animate-skeleton skeleton-from-ocean-300 skeleton-to-ocean-500 h-9 w-9 rounded-full"></div>
      )}
      {!isLoading && Icon}
      <Flex column align={align} className={`${isLoading && 'gap-2'}`}>
        {!isLoading && (
          <>
            <Text size="sm" variant="medium" weight="medium">
              {info}
            </Text>

            <Text className="-mt-1 " variant="heading" size="md" modifier={modifier}>
              {value}
            </Text>
          </>
        )}
        {isLoading && (
          <>
            <div className="animate-skeleton skeleton-from-ocean-300 skeleton-to-ocean-500 h-3 w-14"></div>
            <div className="animate-skeleton skeleton-from-ocean-300 skeleton-to-ocean-500 h-3 w-24"></div>
          </>
        )}
      </Flex>
    </Flex>
  )
}
