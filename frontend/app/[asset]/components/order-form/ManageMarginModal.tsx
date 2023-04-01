'use client'

import { useAddRecentTransaction } from '@pcnv/txs-react'
import { CloseIcon } from '@tradex/icons'
import { cx, Modal, ModalProps, NumericInput } from '@tradex/interface'
import { Dnum, equal, from, lessThan } from 'dnum'
import { BigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils.js'
import { susdAddress, useMarketTransferMargin, usePrepareMarketTransferMargin } from 'perps-hooks'
import { PropsWithChildren, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { format } from 'utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { useRouteMarket } from '../../lib/market/useMarket'
import { Bridge } from '../Bridge'
import { useMarginDetails } from './MarginDetails'

const useSUsdBalance = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const { data: sUSDBalance } = useBalance({ address, token: susdAddress[chainId] })

  return sUSDBalance && from([sUSDBalance.value.toBigInt(), sUSDBalance.decimals])
}

const SelectTransferTypeButtonStyle = cx(
  'centered h-full basis-full rounded-full text-sm font-medium transition-none',
  'btn btn-underline aria-pressed:btn-primary',
)

function SelectTranferType({
  type,
  onChange,
}: {
  type: 'deposit' | 'withdraw'
  onChange: (t: 'deposit' | 'withdraw') => void
}) {
  return (
    <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex h-11 w-full gap-2 rounded-full bg-opacity-50 p-1 ">
      <button
        aria-pressed={type === 'deposit'}
        onClick={() => onChange('deposit')}
        className={SelectTransferTypeButtonStyle}
      >
        Deposit
      </button>
      <button
        aria-pressed={type === 'withdraw'}
        onClick={() => onChange('withdraw')}
        className={SelectTransferTypeButtonStyle}
      >
        Withdraw
      </button>
    </div>
  )
}

function TransferMarginInput({
  onValueChange,
  value,
  label,
  max,
}: {
  value: string
  label: string
  max: string
  onValueChange: (e: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-dark-accent ocean:text-blue-accent mb-1 flex items-center justify-between px-3 text-xs">
        <span>{label}</span>
        <span>{format(max) || '0.00'} sUSD</span>
      </div>

      <NumericInput
        value={value}
        onValueChange={(e) => onValueChange(e.value)}
        className="placeholder:text-dark-30 ocean:placeholder:text-blue-30 bg text-dark-accent ocean:text-blue-accent w-full"
        placeholder="0.0"
        right={() => (
          <button
            onClick={() => onValueChange(max)}
            className="text-dark-30 text-xs font-bold hover:underline"
          >
            MAX
          </button>
        )}
      />
    </div>
  )
}

function WithdrawInput({
  onValueChange,
  value,
}: {
  value: string
  onValueChange: (e: string) => void
}) {
  const { data: accessibleMargin = '0' } = useMarginDetails((m) =>
    format(m.accessibleMargin, undefined),
  )

  return (
    <TransferMarginInput
      onValueChange={onValueChange}
      value={value}
      max={accessibleMargin}
      label="Accessible margin:"
    />
  )
}

function DepositInput({
  onValueChange,
  value,
}: {
  value: string
  onValueChange: (e: string) => void
}) {
  const balance = useSUsdBalance()

  return (
    <TransferMarginInput
      onValueChange={onValueChange}
      value={value}
      max={format(balance, undefined)}
      label="Balance:"
    />
  )
}

function WrappedBridge() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id
  const { refetch } = useBalance({ address, token: susdAddress[chainId] })

  const registerTransaction = useAddRecentTransaction()

  return (
    <Bridge
      onBridgeSuccess={() => refetch()}
      onSubmit={(data) => {
        const tx = data.txData[0]
        registerTransaction({
          hash: tx.hash,
          meta: {
            description: `Bridge ${data.sourceToken} to ${data.destinationToken}`,
          },
        })
      }}
    />
  )
}

function SubmitMarginTransferButton({
  disabled,
  value,
  children,
}: PropsWithChildren<{ disabled: boolean; value?: BigNumber }>) {
  const market = useRouteMarket()

  const { config } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!value,
    args: value && [value],
  })
  const { write: transferMargin } = useMarketTransferMargin(config)

  return (
    <button
      onClick={transferMargin}
      disabled={!transferMargin || disabled}
      className="btn centered btn-secondary h-12 w-full rounded-full capitalize"
    >
      {children}
    </button>
  )
}

const getTransferMarginButtonProps = (
  value: string,
  balance: Dnum | undefined,
  type: 'deposit' | 'withdraw',
): Parameters<typeof SubmitMarginTransferButton>[0] => {
  if (!balance) return { children: 'Loading...', disabled: true }

  let label: string = type
  if (equal(balance, 0)) label = 'Not enough sUSD'
  if (!value) (label = 'Enter an amount'), (value = '0')
  if (lessThan(balance, value)) label = 'Not enough sUSD'
  return {
    children: label,
    disabled: label !== type,
    value: parseUnits(value).mul(type === 'withdraw' ? -1 : 1),
  }
}

function WithdrawButton({ value }: { value: string }) {
  const { data: accessibleMargin } = useMarginDetails((m) => m.accessibleMargin)
  return (
    <SubmitMarginTransferButton
      {...getTransferMarginButtonProps(value, accessibleMargin, 'withdraw')}
    />
  )
}

function DepositButton({ value }: { value: string }) {
  const balance = useSUsdBalance()
  return <SubmitMarginTransferButton {...getTransferMarginButtonProps(value, balance, 'deposit')} />
}

export function ManageMarginModal(props: ModalProps) {
  const [transferType, setTransferType] = useState<'deposit' | 'withdraw'>('deposit')

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 150)

  return (
    <Modal
      {...props}
      className="card card-secondary-outlined relative h-fit w-[400px] gap-4 py-3 px-4"
    >
      <button onClick={props.onClose} className="box-4 absolute top-5 right-4 outline-none">
        <CloseIcon className="fill-dark-90 ocean:to-blue-300 box-4" />
      </button>
      <div className="flex flex-col gap-2">
        <span className="text-dark-accent ocean:text-blue-accent font-medium ">
          Transfer Margin
        </span>
        <SelectTranferType type={transferType} onChange={setTransferType} />
      </div>
      {transferType === 'deposit' ? (
        <>
          <WrappedBridge />
          <DepositInput value={value} onValueChange={setValue} />
          <p className="text-dark-90 ocean:text-blue-accent text-center text-xs">
            A $50 margin minimum is required to open a position.
          </p>
          <DepositButton value={debouncedValue} />
        </>
      ) : (
        <>
          <WithdrawInput value={value} onValueChange={setValue} />
          <WithdrawButton value={debouncedValue} />
        </>
      )}
    </Modal>
  )
}
