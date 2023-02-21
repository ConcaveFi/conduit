import { optimismGoerli } from '@wagmi/core/chains'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { PropsWithChildren } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'

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
