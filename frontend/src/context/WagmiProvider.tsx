import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { publicProvider } from '@wagmi/core/providers/public'
import { optimismGoerli } from '@wagmi/core/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ReactNode } from 'react'
const { chains, provider } = configureChains(
  [mainnet, optimismGoerli],
  [publicProvider(), alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

const client = createClient({
  autoConnect: true,
  provider,
})
// getDefaultClient({
//   appName: 'Exchangett',
//   alchemyId: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn',
//   chains,
// }),,

export function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
