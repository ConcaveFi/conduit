import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { mainnet, optimismGoerli } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'
import { PropsWithChildren } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'

const { chains, provider } = configureChains(
  [optimismGoerli, mainnet],
  [alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})
const client = createClient({
  provider: multicallProvider(provider),
  autoConnect: true,
  connectors,
})

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
