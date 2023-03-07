import { sUSD_ADDRESS } from '@tradex/core'
import { CloseIcon } from '@tradex/icons'
import { Modal, ModalProps, NumericInput } from '@tradex/interface'
import { parseUnits } from 'ethers/lib/utils'
import {
  useMarketTransferMargin,
  usePrepareMarketTransferMargin,
  useSusdBalanceOf,
} from 'perps-hooks'
import { Fragment, useMemo, useState } from 'react'
import { formatUsd } from 'src/utils/format'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { DepositWithdrawSelector, DWSelectorType } from '../DepositWithdrawSelector'
import { useRouteMarket } from '../hooks/useMarket'

export function ManageMarginModal(props: ModalProps) {
  const [value, setValue] = useState<number>()
  const market = useRouteMarket()

  const debouncedValue = useDebounce(value, 150)
  const { config } = usePrepareMarketTransferMargin({
    address: market?.address,
    enabled: !!debouncedValue,
    args: [parseUnits(String(debouncedValue || '0'), 18)],
  })

  const { address } = useAccount()
  const { write: depositMargin } = useMarketTransferMargin(config)
  const { data: sUSDBalance } = useSusdBalanceOf({ args: address && [address] })

  return (
    <Modal
      {...props}
      className="card card-secondary-outlined relative h-fit w-[400px] gap-4 p-[16px_12px]"
    >
      <span className="text-ocean-200 font-medium ">Deposit</span>
      <CloseIcon className="box-4 fill-ocean-200 absolute top-5 right-4" />
      <DepositWithdrawSelector>{renderTabComponent}</DepositWithdrawSelector>
    </Modal>
  )

  function renderTabComponent(type: DWSelectorType) {
    return (
      <Fragment>
        <SUSDInput value={value} onValueChange={setValue} />
        <p className="text-ocean-300 text-center text-sm">
          A $50 margin minimum is required to open a position.
        </p>
        <button
          onClick={depositMargin}
          disabled={!depositMargin || type === 'withdraw'}
          className="btn centered border-ocean-300 disabled:border-ocean-400 disabled:text-ocean-300 text-ocean-200 h-12 w-full rounded-full border-2 capitalize"
        >
          {type} Margin
        </button>
      </Fragment>
    )
  }
}

function SUSDInput(props: { value?: number; onValueChange?: (e?: number) => void }) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id || optimism.id

  const { data: sUSDBalance, isLoading } = useBalance({ address, token: sUSD_ADDRESS[chainId] })
  const numBalance = useMemo(() => Number(sUSDBalance?.formatted || '0'), [sUSDBalance])

  if (isLoading) return sUSDInputSkeleton
  const balance = formatUsd(sUSDBalance?.formatted || '0')
  return (
    <div className=" ">
      {/* Info section */}
      <div className="mb-1 flex items-center justify-between px-3">
        <span className="text-ocean-200 text-xs ">Balance:</span>
        <span className="text-ocean-200 text-sm ">
          <span className="text-white">{balance}</span>
          &nbsp; sUSD
        </span>
      </div>

      {/* input section */}
      <div className="bg-ocean-900 flex h-12 w-full items-center justify-between rounded-full px-4">
        <NumericInput
          value={props.value}
          onValueChange={(e) => props?.onValueChange?.(e.floatValue)}
          className="placeholder:text-ocean-400 w-full bg-transparent text-white"
          placeholder="0.0"
        />
        <button
          onClick={() => props.onValueChange?.(numBalance)}
          className="text-ocean-300 text-xs hover:underline"
        >
          MAX
        </button>
      </div>
    </div>
  )
}

const sUSDInputSkeleton = (
  <div className=" flex flex-col gap-2">
    <div className="flex items-center justify-between px-2">
      <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-200 h-4 w-10 rounded-lg"></div>

      <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-200 h-4 w-10 rounded-lg"></div>
    </div>
    <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-200 h-12 w-full rounded-full"></div>
  </div>
)
