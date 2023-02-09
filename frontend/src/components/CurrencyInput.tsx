import { Flex, Input, Text } from '@tradex/interface'

export function CurrencyInput({ currency }: { currency: string }) {
  return (
    <Flex className="w-full h-14 bg-ocean-600 rounded-full px-6" centered>
      <Input variant="simple" className="w-full" placeholder="0.0" />
      <Text variant="low">{currency}</Text>
    </Flex>
  )
}
