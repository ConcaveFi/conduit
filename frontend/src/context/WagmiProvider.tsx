import { PropsWithChildren } from 'react'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { optimismGoerli, optimism } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'

import { withMulticall } from 'with-multicall'

const { chains, provider } = configureChains(
  [mainnet, optimismGoerli, optimism],
  [alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

const client = createClient({
  provider: withMulticall(provider),
  connectors: [new MetaMaskConnector({ chains })],
})

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
