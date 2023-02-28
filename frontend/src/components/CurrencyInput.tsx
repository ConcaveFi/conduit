import { NumericInput, NumericInputProps } from '@tradex/interface'
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
    <div className="bg-ocean-600 centered flex min-h-[60px] w-full rounded-xl px-6">
      <NumericInput variant="simple" className="w-full" placeholder="0.0" {...props} />
      <div className="flex flex-col items-end">
        <span className="text-low text-lg">{currency?.symbol}</span>

        <button className="btn btn-underline" onClick={handleClickBalance}>
          <span className="text-medium text-xs">Balance</span>
          <span className="text-heading text-xs">
            {data && format(data?.formatted)}
            {!data && '$0.00'}
          </span>
        </button>
      </div>
    </div>
  )
}
