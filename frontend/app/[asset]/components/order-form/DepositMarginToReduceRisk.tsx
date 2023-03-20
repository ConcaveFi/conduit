import { useQueryModal } from 'utils/enum/urlModal'

export function DepositMarginToReduceRisk() {
  const { onOpen } = useQueryModal({ modalType: 'margin', type: 'transfer' })
  return (
    <div className="flex items-center justify-between">
      <span className="ocean:text-blue-accent text-dark-accent text-xs">
        Increase margin to reduce risk
      </span>
      <button
        onClick={onOpen}
        className="text-dark-accent ocean:text-blue-accent border-coal ocean:border-blue-accent  rounded-md border px-3 py-0.5 text-xs"
      >
        Deposit Margin
      </button>
    </div>
  )
}
