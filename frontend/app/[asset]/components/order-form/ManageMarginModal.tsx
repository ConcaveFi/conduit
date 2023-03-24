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
import { useDebounce } from 'usehooks-ts'
import { format } from 'utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { useRouteMarket } from '../../lib/market/useMarket'
import { DWSelectorType, DepositWithdrawSelector } from '../DepositWithdrawSelector'

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
      className="card card-secondary-outlined  relative h-fit w-[400px] gap-4 p-[16px_12px]"
    >
      <span className="text-dark-accent ocean:text-blue-accent font-medium ">Deposit</span>
      <button onClick={props.onClose} className="outline-none ">
        <CloseIcon className="box-4 fill-ocean-200 absolute top-5 right-4" />
      </button>
      <DepositWithdrawSelector>{renderTabComponent}</DepositWithdrawSelector>
    </Modal>
  )

  function renderTabComponent(type: DWSelectorType) {
    return (
      <Fragment>
        <SUSDInput value={value} onValueChange={setValue} />
        <p className="text-dark-accent ocean:text-blue-accent text-center text-sm">
          A $50 margin minimum is required to open a position.
        </p>
        <button
          onClick={depositMargin}
          disabled={!depositMargin || type === 'withdraw'}
          className="btn centered btn-secondary  h-12 w-full rounded-full  capitalize"
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

  if (isLoading) return <SUSDInputSkeleton />

  const balance = format(sUSDBalance?.formatted || '0')
  return (
    <div className=" ">
      {/* Info section */}
      <div className="text-dark-accent ocean:text-blue-accent mb-1 flex items-center justify-between px-3 ">
        <span className="text-xs ">Balance:</span>
        <span className="text-sm ">
          {balance}
          &nbsp; sUSD
        </span>
      </div>

      {/* input section */}
      <NumericInput
        value={props.value}
        onValueChange={(e) => props?.onValueChange?.(e.floatValue)}
        className="placeholder:text-dark-30 ocean:placeholder:text-blue-30 bg text-dark-accent ocean:text-blue-accent w-full"
        placeholder="0.0"
        right={() => {
          return (
            <button
              onClick={() => props.onValueChange?.(numBalance)}
              className="text-dark-30 text-xs font-bold hover:underline"
            >
              MAX
            </button>
          )
        }}
      />
    </div>
  )
}

const SUSDInputSkeleton = () => (
  <div className=" flex flex-col gap-2">
    <div className="flex items-center justify-between px-2">
      <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-200 h-4 w-10 rounded-lg"></div>

      <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-200 h-4 w-10 rounded-lg"></div>
    </div>
    <div className="animate-skeleton skeleton-from-ocean-400 skeleton-to-ocean-200 h-12 w-full rounded-full"></div>
  </div>
)
