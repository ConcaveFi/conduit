import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient } from '@tanstack/react-query'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'
import { PropsWithChildren } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'

const { chains, provider, webSocketProvider } = configureChains(
  [optimismGoerli, optimism],
  [alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

export type SupportedChainId = (typeof chains)[number]['id']

const { connectors } = getDefaultWallets({
  appName: 'Conduit',
  chains,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // keepPreviousData: true,
      // staleTime: 300,
    },
  },
})

const client = createClient({
  autoConnect: true,
  // queryClient,
  connectors,
  provider: multicallProvider(provider),
  webSocketProvider,
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
