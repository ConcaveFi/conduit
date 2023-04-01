'use client'

import { useQueryModal } from 'utils/enum/urlModal'
import { useAccount } from 'wagmi'

export function DepositMarginToReduceRisk() {
  const { onOpen } = useQueryModal({ modalType: 'margin', type: 'transfer' })
  const { isConnected } = useAccount()
  return (
    <div className="flex items-center justify-between">
      <span className="ocean:text-blue-accent text-dark-accent text-xs">
        Increase margin to reduce risk
      </span>
      <button
        disabled={!isConnected}
        onClick={onOpen}
        className="text-dark-accent ocean:text-blue-accent border-coal ocean:border-blue-accent  rounded-md border px-3 py-0.5 text-xs"
      >
        Deposit Margin
      </button>
    </div>
  )
}
