import { NumericInput } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils.js'
import {
  useMarketTransferMargin,
  usePrepareMarketTransferMargin,
  useSusdBalanceOf,
} from 'perps-hooks'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useQueryModal } from 'utils/enum/urlModal'
import { format } from 'utils/format'
import { useAccount } from 'wagmi'
import { ManageMarginModal } from './ManageMarginModal'

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
        {format(formatUnits(balance, 18))}
      </span>
    </button>
  )
}

function TransferInput({
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
        <span className="text-light-500 ocean:text-ocean-300 text-lg">sUSD</span>
        <SusdBalance balance={balance} onClick={onChange} />
      </div>
    </div>
  )
}

const getDepositButtonLabel = (input: string, balance?: BigNumber) => {
  if (!balance) return 'Loading...'
  if (balance.isZero()) return 'Not enough sUSD'
  if (!input) return 'Enter an amount'
  if (balance.lt(input)) return 'Not enough sUSD'
  return 'Deposit'
}

function TransferMargin() {
  const [value, setValue] = useState('')
  const { t } = useTranslation()
  const market = useRouteMarket()

  const { address } = useAccount()
  const { data: balance } = useSusdBalanceOf({ args: address && [address] })

  const debouncedValue = useDebounce(value, 150)
  const { config } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!debouncedValue,
    args: [BigNumber.from(debouncedValue || 0)],
  })
  const { write: depositMargin } = useMarketTransferMargin(config)

  return (
    <div className="centered card card-primary h-fit w-[400px] gap-4 p-4">
      <span className="text-light-500 ocean:text-white text-xl">{t('deposit margin')}</span>
      <TransferInput value={value} onChange={setValue} balance={balance?.toString()} />
      <button
        disabled={!depositMargin}
        onClick={depositMargin}
        className="btn btn-primary.outlined centered h-14 w-full rounded-lg py-6"
      >
        {getDepositButtonLabel(value, balance)}
      </button>
    </div>
  )
}

export const TransferMarginButton = function TransferMarginButton() {
  const { t } = useTranslation()
  const market = useRouteMarket()

  const { isOpen, onClose, onOpen } = useQueryModal({ modalType: 'margin', type: 'transfer' })

  return (
    <>
      <button
        onClick={onOpen}
        className="text-light-400 bg-ocean-300 flex w-full items-center justify-center rounded-lg py-3 text-center text-sm font-medium"
      >
        Deposit Margin to {market.asset}/sUSD
      </button>
      <ManageMarginModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}