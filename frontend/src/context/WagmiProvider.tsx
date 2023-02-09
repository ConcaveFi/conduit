import { createClient, mainnet, WagmiConfig } from 'wagmi'
import { optimismGoerli, optimism } from '@wagmi/core/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ReactNode } from 'react'

const client = createClient(
  getDefaultClient({
    appName: 'Exchangett',
    alchemyId: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn',
    chains: [mainnet, optimismGoerli, optimism],
  }),
)

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider> {children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
