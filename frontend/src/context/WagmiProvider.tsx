import { createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ReactNode } from 'react'

const client = createClient(
  getDefaultClient({
    appName: 'Exchangett',
    alchemyId: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn',
  }),
)

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
