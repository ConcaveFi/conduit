'use client'

import { useAddRecentTransaction } from '@pcnv/txs-react'
import { CloseIcon, Spinner } from '@tradex/icons'
import { Modal, ModalProps, NumericInput, cx, twMerge } from '@tradex/interface'
import { Dnum, equal, from, lessThan } from 'dnum'
import { BigNumber } from 'ethers'
import { format } from 'utils/format'

import { parseUnits } from 'ethers/lib/utils.js'
import { susdAddress, useMarketTransferMargin, usePrepareMarketTransferMargin } from 'perps-hooks'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { useRouteMarket } from '../../lib/market/useMarket'
import { Bridge } from '../Bridge'
import { useMarginDetails } from './MarginDetails'

const useSUsdBalance = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const { data: sUSDBalance } = useBalance({ address, token: susdAddress[chainId] })

  if (!sUSDBalance) return undefined
  return from([sUSDBalance.value.toBigInt(), sUSDBalance.decimals])
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
    <div className="flex w-full gap-2 p-1 bg-opacity-50 rounded-full bg-dark-main-bg ocean:bg-blue-main-bg h-11 ">
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
  onMax,
  isLoading,
  label,
  max,
  maxFlag,
}: {
  onMax: VoidFunction
  isLoading: boolean
  value: string
  label: string
  max: Dnum
  maxFlag?: boolean
  onValueChange: (e: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-3 mb-1 text-xs text-dark-accent ocean:text-blue-accent">
        <span>{label}</span>
        <span>{format(max) || '0.00'} sUSD</span>
      </div>

      <NumericInput
        value={value}
        onValueChange={(e) => {
          if (!e.floatValue) return onValueChange('0')
          onValueChange(e.floatValue > 0.001 ? e.floatValue?.toString() : e.formattedValue)
        }}
        className="w-full placeholder:text-dark-30 ocean:placeholder:text-blue-30 bg text-dark-accent ocean:text-blue-accent"
        placeholder="0.0"
        right={() => (
          <button
            onClick={() => {
              onMax()
            }}
            className={twMerge(
              'text-xs font-bold  hover:underline ',
              maxFlag ? 'text-dark-accent ocean:text-blue-accent' : 'text-dark-30',
            )}
          >
            {isLoading ? <Spinner /> : 'MAX'}
          </button>
        )}
      />
    </div>
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
  type,
}: PropsWithChildren<{
  disabled: boolean
  value?: BigNumber
  type?: 'withdraw' | 'deposit'
}>) {
  const market = useRouteMarket()
  const network = useNetwork()
  const registerTx = useAddRecentTransaction()
  const { config, isLoading } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!value && !value.eq(0),
    args: value && [value],
  })
  const { write: transferMargin } = useMarketTransferMargin({
    ...config,
    onSuccess({ hash }) {
      if (typeof value?.toBigInt() !== 'bigint') return
      const amount = format(from([value?.toBigInt(), 18]), { digits: 2 })
      let description

      if (type === 'deposit') description = `Deposit ${amount} to ${market?.asset}`
      else description = `Withdraw ${amount} to ${market?.asset}`
      registerTx({ hash, meta: { description } })
    },
  })

  const { switchNetwork } = useSwitchNetwork()
  if (network.chain?.id !== optimism.id && network.chain?.id !== optimismGoerli.id)
    return (
      <button
        onClick={() => switchNetwork?.(optimism.id)}
        className="w-full h-12 capitalize rounded-full btn centered btn-secondary"
      >
        Switch to Optimism
      </button>
    )

  return (
    <button
      onClick={transferMargin}
      disabled={!transferMargin || isLoading || disabled || value?.eq(0)}
      className="w-full h-12 capitalize rounded-full btn centered btn-secondary"
    >
      {isLoading && <Spinner />} {children}
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
  if (!value || +value === 0) (label = 'Enter an amount'), (value = '0')
  if (lessThan(balance, value)) label = 'Not enough sUSD'
  return {
    children: label,
    disabled: label !== type,
    value: parseUnits(value).mul(type === 'withdraw' ? -1 : 1),
    type,
  }
}

function DepositButton({ value }: { value: string }) {
  const balance = useSUsdBalance()
  return <SubmitMarginTransferButton {...getTransferMarginButtonProps(value, balance, 'deposit')} />
}

export function ManageMarginModal(props: ModalProps) {
  const [transferType, setTransferType] = useState<'deposit' | 'withdraw'>('deposit')

  return (
    <Modal
      {...props}
      className="card card-secondary-outlined relative h-fit w-[400px] gap-4 py-3 px-4"
    >
      <button onClick={props.onClose} className="absolute outline-none box-4 top-5 right-4">
        <CloseIcon className="fill-dark-90 ocean:to-blue-300 box-4" />
      </button>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-dark-accent ocean:text-blue-accent ">
          Transfer Margin
        </span>
        <SelectTranferType type={transferType} onChange={setTransferType} />
      </div>
      {transferType === 'deposit' ? <Deposit /> : <Withdraw />}
    </Modal>
  )
}

const Deposit = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 150)
  const balance = useSUsdBalance()
  const [max, setMax] = useState(false)

  useEffect(() => {
    if (max) {
      setValue(format(balance || [0n, 18], { digits: undefined }))
    }
  }, [balance, max])

  return (
    <>
      <TransferMarginInput
        isLoading={false}
        onMax={() => setMax((v) => !v)}
        onValueChange={(v) => {
          setValue(v), setMax(false)
        }}
        value={value}
        maxFlag={max}
        max={balance || [0n, 18]}
        label="Balance:"
      />

      <p className="text-xs text-center text-dark-90 ocean:text-blue-accent">
        A $50 margin minimum is required to open a position.
      </p>
      <DepositButton value={debouncedValue} />
    </>
  )
}

const Withdraw = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 150)
  const accessibleMargin = useMarginDetails((m) => m.accessibleMargin)
  const props = { ...getTransferMarginButtonProps(value, accessibleMargin.data, 'withdraw') }
  const [max, setMax] = useState(false)

  useEffect(() => {
    if (max) {
      setValue(format(accessibleMargin.data || [0n, 18], { digits: undefined }))
    }
  }, [accessibleMargin, max])

  return (
    <>
      <TransferMarginInput
        onValueChange={(v) => {
          setValue(v), setMax(false)
        }}
        value={debouncedValue}
        max={accessibleMargin.data || [0n, 18]}
        isLoading={accessibleMargin.isLoading || accessibleMargin.isRefetching}
        maxFlag={max}
        onMax={() => setMax((v) => !v)}
        label="Accessible margin:"
      />
      <SubmitMarginTransferButton {...props} />
    </>
  )
}
