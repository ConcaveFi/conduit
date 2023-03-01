import { Modal, NumericInput } from '@tradex/interface'
import { BigNumber, FixedNumber } from 'ethers'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useMarketTransferMargin,
  usePrepareMarketTransferMargin,
  useSusdBalanceOf,
} from 'perps-hooks'
import { useState } from 'react'
import { useRouteMarket } from 'src/pages/perps'
import { formatUsd, safeFixedNumber } from 'src/utils/format'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'

function SusdBalance({
  onClick,
  balance,
}: {
  balance?: string
  onClick: (balance: string) => void
}) {
  if (!balance)
    return (
      <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-500 h-3 w-24 rounded" />
    )

  return (
    <button className="btn btn-underline" onClick={() => onClick(balance)}>
      <span className="text-light-500 ocean:text-ocean-200 text-xs font-medium ">Balance: </span>
      <span className="text-light-600 ocean:text-white text-xs font-medium">
        {formatUsd(balance)}
      </span>
    </button>
  )
}

function DepositInput({
  onChange,
  value,
  balance,
}: {
  balance?: string
  onChange: (v: string) => void
  value: string
}) {
  return (
    <div className="bg-light-300 ocean:bg-ocean-600 centered flex min-h-[60px] w-full rounded-xl px-6">
      <NumericInput
        variant="simple"
        className="w-full"
        placeholder="0.0"
        value={value}
        onValueChange={({ value }, { source }) => {
          if (source === 'event') onChange(value)
        }}
      />
      <div className="flex flex-col items-end">
        <span className="text-light-500 ocean:text-ocean-300 text-lg">sUsd</span>
        <SusdBalance balance={balance} onClick={onChange} />
      </div>
    </div>
  )
}

const getDepositButtonLabel = (input: string, balance?: FixedNumber) => {
  if (!balance) return 'Loading...'
  if (balance.isZero()) return 'Insufficent balance' // TODO: labels
  if (!input) return 'Enter an amount'
  const fixedInput = safeFixedNumber(input)
  if (balance.toString() === fixedInput.toString()) return 'Deposit'
  if (balance.subUnsafe(fixedInput).isNegative()) return 'Not enough balance'
  return 'Deposit'
}

function DepositMargin() {
  const [value, setValue] = useState('')

  const debouncedValue = useDebounce(value, 150)

  const market = useRouteMarket()

  const { address } = useAccount()
  const { data: balance } = useSusdBalanceOf({
    args: address && [address],
    select: (v) => FixedNumber.fromValue(v),
  })

  const { config } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!debouncedValue,
    args: [BigNumber.from(debouncedValue || 0)],
  })
  const { write } = useMarketTransferMargin(config)

  return (
    <div className="centered card card-primary h-fit w-[400px] gap-4 p-4">
      <span className="text-light-500 ocean:text-white text-xl">Deposit Margin</span>
      <DepositInput value={value} onChange={setValue} balance={balance?.toString()} />
      <button
        disabled={!write}
        onClick={write}
        className="btn btn-primary.outlined centered h-14 w-full rounded-lg py-6"
      >
        {getDepositButtonLabel(value, balance)}
      </button>
    </div>
  )
}

export function DepositMarginModal() {
  const query = useSearchParams()
  const router = useRouter()

  return (
    <Modal isOpen={query.get('modal') === 'deposit-margin'} onClose={() => router.back()}>
      <DepositMargin />
    </Modal>
  )
}
