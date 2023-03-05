import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { createClient, WagmiConfig } from 'wagmi'
import { chains, provider, webSocketProvider } from './wagmi-config'

const { connectors } = getDefaultWallets({
  appName: 'Conduit',
  chains,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: 300,
    },
  },
})

const client = createClient({
  autoConnect: true,
  queryClient,
  connectors,
  provider,
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
