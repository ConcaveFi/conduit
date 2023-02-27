import { Button, Flex, NumericInput, NumericInputProps, Text } from '@tradex/interface'
import { FetchTokenResult } from '@wagmi/core'
import { format } from 'src/utils/format'
import { useAccount, useBalance } from 'wagmi'

interface CurrencyInput extends NumericInputProps {
  currency?: FetchTokenResult
  onClickBalance?(balance: bigint, decimals: number): void
}
export function CurrencyInput({ currency, onClickBalance, ...props }: CurrencyInput) {
  const { address } = useAccount()
  const enabled = Boolean(currency?.address)
  const { data } = useBalance({ address, token: currency?.address, enabled })

  const handleClickBalance = () => data && onClickBalance?.(data?.value.toBigInt(), data.decimals)

  return (
    <Flex className="bg-ocean-600 min-h-[60px] w-full rounded-xl px-6" centered>
      <NumericInput variant="simple" className="w-full" placeholder="0.0" {...props} />
      <Flex column align={'end'}>
        <Text variant="low">{currency?.symbol}</Text>

        <Button variant={'underline'} onClick={handleClickBalance}>
          <Text size={'xs'} variant="medium">
            Balance
          </Text>
          <Text size={'xs'} variant="heading">
            {data && format(data?.formatted)}
            {!data && '$0.00'}
          </Text>
        </Button>
      </Flex>
    </Flex>
  )
}
