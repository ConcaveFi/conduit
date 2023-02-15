import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { optimismGoerli, optimism } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { ReactNode } from 'react'

const { chains, provider } = configureChains(
  [mainnet, optimismGoerli, optimism],
  [alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

const client = createClient({
  provider,
  connectors: [new MetaMaskConnector({ chains })],
})

export function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
