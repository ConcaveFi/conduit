import { getDefaultProvider } from 'ethers'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import { optimismGoerli } from '@wagmi/core/chains'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { InjectedConnector } from '@wagmi/core'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
const { chains, provider } = configureChains([mainnet, optimismGoerli], [publicProvider()])

const client = createClient(
  getDefaultClient({
    appName: 'Exchangett',
    alchemyId: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn',
    chains,
  }),
)

export function WagmiProvider({ children }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
