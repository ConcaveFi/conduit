import { Spinner } from '@tradex/icons'
import { useIsMounted } from 'usehooks-ts'
import { useAccount, useNetwork } from 'wagmi'
import { useSwap } from './SwapCard'

export const SwapButton = ({
  spender,
  error,
  allow,
  balanceIn,
  doSwap,
  inputIn,
}: ReturnType<typeof useSwap>) => {
  const { isConnected } = useAccount()
  const mounted = useIsMounted()
  const { chain } = useNetwork()
  const states = {
    disconnected: { children: 'Connect Wallet' },
    loading: { children: <Spinner /> },
    amount: { children: 'Enter an amount', disabled: true },
    amountOverflow: { children: 'Insufficient balance', disabled: true },
    approve: { children: 'Approve', onClick: () => allow.data && allow.data() },
    swap: { children: 'Swap', onClick: doSwap },
    error: { children: error?.message },
    chainId: { children: 'Unsupported chain' },
  } as const

  const state = (() => {
    if (!mounted()) return 'loading'
    if (error && error.message) return 'error'
    if (!isConnected) return 'disconnected'
    if (10 !== chain?.id) return `chainId`
    if (spender.isFetching) return 'loading'
    if (allow.isFetching) return 'loading'
    if (balanceIn.isFetching) return 'loading'
    if (inputIn.currency.value.eq(0)) return 'amount'
    if (!balanceIn.data || balanceIn.data?.value.lt(inputIn.currency.value)) return 'amountOverflow'
    if (allow.data) return 'approve'
    return 'swap'
  })()
  return (
    <button className="btn-secondary mt-2 rounded-full p-2 py-3 text-base" {...states[state]} />
  )
}
