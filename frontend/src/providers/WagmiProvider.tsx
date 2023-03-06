import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains } from '@wagmi/core'
import { optimism, optimismGoerli } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'
import { PropsWithChildren } from 'react'
import { createClient, WagmiConfig } from 'wagmi'

const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [optimism, optimismGoerli],
  [alchemyProvider({ apiKey: 'Kng1p_dEJaldM51_qK6aqP9YvBY0cVxf' })],
)

export const provider = multicallProvider(_provider)

export type SupportedChainId = (typeof chains)[number]['id']

const { connectors } = getDefaultWallets({
  appName: 'Conduit',
  chains,
})

const client = createClient({
  autoConnect: true,
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
