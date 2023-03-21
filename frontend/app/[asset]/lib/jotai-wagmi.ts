import { Address } from '@wagmi/core'
import { provider } from 'app/providers/wagmi-config'
import { wagmiClient } from 'app/providers/WagmiProvider'
import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'

type WagmiState = {
  status: 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
  account?: Address
  provider: ReturnType<typeof provider>
  chain?: { id: number; unsupported: boolean }
}

export const wagmiAtom = atom<WagmiState>({
  status: wagmiClient.status,
  account: wagmiClient.data?.account,
  provider: wagmiClient.provider,
  chain: wagmiClient.data?.chain,
})
wagmiAtom.onMount = (set) =>
  wagmiClient.subscribe(
    ({ data, status, provider }) => ({
      status,
      account: data?.account,
      provider: provider,
      chain: data?.chain,
    }),
    (wagmiState) => set(wagmiState),
  )

export const connectedChainAtom = selectAtom(wagmiAtom, ({ chain }) => chain)
export const connectedAccountAtom = selectAtom(wagmiAtom, ({ account }) => account)
export const providerAtom = selectAtom(wagmiAtom, ({ provider }) => provider)
