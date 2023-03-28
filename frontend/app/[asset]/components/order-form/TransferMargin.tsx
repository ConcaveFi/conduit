'use client'

import { useTranslation } from '@tradex/languages'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { useQueryModal } from 'utils/enum/urlModal'
import { useAccount } from 'wagmi'
import { ManageMarginModal } from './ManageMarginModal'

export const TransferMarginButton = function TransferMarginButton() {
  const { t } = useTranslation()
  const market = useRouteMarket()

  const { isOpen, onClose, onOpen } = useQueryModal({ modalType: 'margin', type: 'transfer' })
  const { isConnected } = useAccount()

  return (
    <>
      <button
        disabled={!isConnected}
        onClick={onOpen}
        className="btn-primary disabled:bg-dark-30 disabled:ocean:bg-blue-30 flex w-full items-center justify-center rounded-lg py-3 text-center text-sm font-medium"
      >
        Deposit Margin to {market?.asset}/sUSD
      </button>
      <ManageMarginModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
