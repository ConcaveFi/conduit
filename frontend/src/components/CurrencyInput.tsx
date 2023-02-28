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
    <div className="bg-light-300 ocean:bg-ocean-600 centered flex min-h-[60px] w-full rounded-xl px-6">
      <NumericInput variant="simple" className="w-full" placeholder="0.0" {...props} />
      <div className="flex flex-col items-end">
        <span className="text-light-500 ocean:text-ocean-300 text-lg">{currency?.symbol}</span>

        <button className="btn btn-underline" onClick={handleClickBalance}>
          <span className="text-light-500 ocean:text-ocean:200 text-xs ">Balance</span>
          <span className="text-light-600 ocean:text-white text-xs font-medium">
            {data && format(data?.formatted)}
            {!data && '$0.00'}
          </span>
        </button>
      </div>
    </div>
  )
}
