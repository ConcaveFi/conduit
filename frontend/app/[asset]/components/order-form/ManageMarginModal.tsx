'use client'

import { useAddRecentTransaction } from '@pcnv/txs-react/.'
import { CloseIcon } from '@tradex/icons'
import { cx, Modal, ModalProps, NumericInput } from '@tradex/interface'
import { Dnum, equal, from, lessThan } from 'dnum'
import { BigNumber } from 'ethers'
import { susdAddress, useMarketTransferMargin, usePrepareMarketTransferMargin } from 'perps-hooks'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { format } from 'utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { useRouteMarket } from '../../lib/market/useMarket'
import { Bridge } from '../Bridge'

const getDepositButtonLabel = (
  input: string,
  balance: Dnum | undefined,
  type: 'deposit' | 'withdraw',
) => {
  if (!balance) return 'Loading...'
  if (equal(balance, 0)) return 'Not enough sUSD'
  if (!input) return 'Enter an amount'
  if (lessThan(balance, input)) return 'Not enough sUSD'
  return type
}

const useSUsdBalance = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const { data: sUSDBalance } = useBalance({ address, token: susdAddress[chainId] })

  return sUSDBalance && from([sUSDBalance.value.toBigInt(), sUSDBalance.decimals])
}

function SUSDInput({
  onValueChange,
  value,
}: {
  value: string
  onValueChange: (e: string) => void
}) {
  const balance = useSUsdBalance()

  return (
    <>
      <div className="text-dark-accent ocean:text-blue-accent mb-1 flex items-center justify-between px-3 ">
        <span className="text-xs ">Balance:</span>
        <span className="text-sm ">
          {balance ? format(balance) : '0.00'}
          &nbsp; sUSD
        </span>
      </div>

      <NumericInput
        value={value}
        onValueChange={(e) => onValueChange(e.value)}
        className="placeholder:text-dark-30 ocean:placeholder:text-blue-30 bg text-dark-accent ocean:text-blue-accent w-full"
        placeholder="0.0"
        right={() => (
          <button
            onClick={() => onValueChange(format(balance, undefined))}
            className="text-dark-30 text-xs font-bold hover:underline"
          >
            MAX
          </button>
        )}
      />
    </>
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
  value,
  type,
}: {
  value: string
  type: 'deposit' | 'withdraw'
}) {
  const market = useRouteMarket()

  const { config } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!value,
    args: [BigNumber.from(value).mul(type === 'withdraw' ? -1 : 1)],
  })
  const { write: transferMargin } = useMarketTransferMargin(config)

  const balance = useSUsdBalance()

  return (
    <button
      onClick={transferMargin}
      disabled={!transferMargin}
      className="btn centered btn-secondary h-12 w-full rounded-full capitalize"
    >
      {getDepositButtonLabel(value, balance, type)}
    </button>
  )
}

export function ManageMarginModal(props: ModalProps) {
  const [transferType, setTransferType] = useState<'deposit' | 'withdraw'>('deposit')

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 150)

  return (
    <Modal
      {...props}
      className="card card-secondary-outlined  relative h-fit w-[400px] gap-4 p-[16px_12px]"
    >
      <span className="text-dark-accent ocean:text-blue-accent font-medium ">Transfer Margin</span>
      <button onClick={props.onClose} className="outline-none ">
        <CloseIcon className="box-4 fill-ocean-200 absolute top-5 right-4" />
      </button>
      <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex h-11 w-full gap-2 rounded-full bg-opacity-50 p-[4px] ">
        <button
          aria-pressed={transferType === 'deposit'}
          onClick={() => setTransferType('deposit')}
          className={cx(
            'centered h-full basis-full rounded-full text-sm font-medium transition-none',
            'btn btn-underline aria-pressed:btn-primary',
          )}
        >
          Deposit
        </button>
        <button
          aria-pressed={transferType === 'withdraw'}
          onClick={() => setTransferType('withdraw')}
          className={cx(
            'centered h-full basis-full rounded-full text-sm font-medium transition-none',
            'btn btn-underline aria-pressed:btn-primary',
          )}
        >
          Withdraw
        </button>
      </div>
      <WrappedBridge />
      <SUSDInput value={value} onValueChange={setValue} />
      {transferType === 'deposit' && (
        <p className="text-dark-accent ocean:text-blue-accent text-center text-sm">
          A $50 margin minimum is required to open a position.
        </p>
      )}
      <SubmitMarginTransferButton value={debouncedValue} type={transferType} />
    </Modal>
  )
}
