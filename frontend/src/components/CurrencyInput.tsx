import { Flex, NumericInput, NumericInputProps, Text } from '@tradex/interface'

interface CurrencyInput extends NumericInputProps {
  currency: string
}
export function CurrencyInput({ currency, ...props }: CurrencyInput) {
  return (
    <Flex className="w-full min-h-[60px] bg-ocean-600 rounded-xl px-6" centered>
      <NumericInput variant="simple" className="w-full" placeholder="0.0" {...props} />
      <Text variant="low">{currency}</Text>
    </Flex>
  )
}
