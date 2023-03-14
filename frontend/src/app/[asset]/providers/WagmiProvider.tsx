import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { PropsWithChildren } from 'react'
import { createClient, WagmiConfig } from 'wagmi'
import { chains, provider, webSocketProvider } from './wagmi-config'

export type SupportedChainId = (typeof chains)[number]['id']

const { connectors } = getDefaultWallets({
  appName: 'Conduit',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
