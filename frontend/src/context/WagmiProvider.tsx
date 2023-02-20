import { PropsWithChildren } from 'react'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { optimismGoerli, optimism } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'

import { multicallProvider } from 'multicall-provider/wagmi'

const { chains, provider } = configureChains(
  [optimismGoerli],
  [alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

const client = createClient({
  provider: multicallProvider(provider),
  connectors: [new MetaMaskConnector({ chains })],
})

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
