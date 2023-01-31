import { createClient, mainnet, WagmiConfig } from 'wagmi'
import { optimismGoerli } from '@wagmi/core/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ReactNode } from 'react'

const client = createClient(
  getDefaultClient({
    appName: 'Exchangett',
    alchemyId: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn',
    chains: [mainnet, optimismGoerli],
  }),
)

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider> {children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
