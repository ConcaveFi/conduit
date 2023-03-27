'use client'

import { CloseIcon } from '@tradex/icons'
import { cx, Modal, ModalProps, NumericInput } from '@tradex/interface'
import { from } from 'dnum'
import { BigNumber } from 'ethers'
import { susdAddress, useMarketTransferMargin, usePrepareMarketTransferMargin } from 'perps-hooks'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { format } from 'utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { useRouteMarket } from '../../lib/market/useMarket'

export function ManageMarginModal(props: ModalProps) {
  const [transferType, setTransferType] = useState<'deposit' | 'withdraw'>('deposit')

  const [value, setValue] = useState('')
  const market = useRouteMarket()

  const debouncedValue = useDebounce(value, 150)
  const { config } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!debouncedValue,
    args: [BigNumber.from(value).mul(transferType === 'withdraw' ? -1 : 1)],
  })
  const { write: transferMargin } = useMarketTransferMargin(config)

  return (
    <Modal
      {...props}
      className="card card-secondary-outlined  relative h-fit w-[400px] gap-4 p-[16px_12px]"
    >
      <span className="text-dark-accent ocean:text-blue-accent font-medium ">Deposit</span>
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
      <SUSDInput value={value} onValueChange={setValue} />
      {transferType === 'deposit' && (
        <p className="text-dark-accent ocean:text-blue-accent text-center text-sm">
          A $50 margin minimum is required to open a position.
        </p>
      )}
      <button
        onClick={transferMargin}
        disabled={!transferMargin || transferType === 'withdraw'}
        className="btn centered btn-secondary h-12 w-full rounded-full capitalize"
      >
        {transferType} margin
      </button>
    </Modal>
  )
}

function SUSDInput({
  onValueChange,
  value,
}: {
  value: string
  onValueChange: (e: string) => void
}) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const { data: sUSDBalance } = useBalance({ address, token: susdAddress[chainId] })

  const balance = sUSDBalance
    ? format(from([sUSDBalance.value.toBigInt(), sUSDBalance.decimals]), undefined)
    : '0'

  return (
    <>
      <div className="text-dark-accent ocean:text-blue-accent mb-1 flex items-center justify-between px-3 ">
        <span className="text-xs ">Balance:</span>
        <span className="text-sm ">
          {balance}
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
            onClick={() => onValueChange(balance)}
            className="text-dark-30 text-xs font-bold hover:underline"
          >
            MAX
          </button>
        )}
      />
    </>
  )
}
