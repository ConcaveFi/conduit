import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import { optimismGoerli } from '@wagmi/core/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ReactNode } from 'react'
const { chains, provider } = configureChains([mainnet, optimismGoerli], [publicProvider()])

const client = createClient(
  getDefaultClient({
    appName: 'Exchangett',
    alchemyId: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn',
    chains,
  }),
)

export function WagmiProvider({ children }: { children: ReactNode }) {
  console.log('testing crash')

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
