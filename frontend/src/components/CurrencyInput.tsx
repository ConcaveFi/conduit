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
  const enabled = Boolean(currency?.address) && Boolean(address)
  const { data } = useBalance({ address, token: currency?.address, enabled })

  const handleClickBalance = () => data && onClickBalance?.(data?.value.toBigInt(), data.decimals)

  return (
    <Flex className="w-full min-h-[60px] bg-ocean-600 rounded-xl px-6" centered>
      <NumericInput variant="simple" className="w-full" placeholder="0.0" {...props} />
      <Flex column align={'end'}>
        <Text variant="low">{currency?.symbol}</Text>
        {data && (
          <Button variant={'underline'} onClick={handleClickBalance}>
            <Text size={'xs'} variant="medium">
              Balance
            </Text>
            <Text size={'xs'} variant="heading">
              {format(data?.value.toBigInt(), 18)}
            </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
