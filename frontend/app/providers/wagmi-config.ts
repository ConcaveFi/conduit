import { configureChains } from '@wagmi/core'
import { mainnet, optimism, optimismGoerli } from '@wagmi/core/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { multicallProvider } from 'multicall-provider/wagmi'

export type SupportedChainId = (typeof chains)[number]['id']

export const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [optimism, optimismGoerli, mainnet],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY })],
)

export const provider = multicallProvider(_provider, { timeWindow: 1 })
