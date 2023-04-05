import { configureChains } from '@wagmi/core'
import { optimism, optimismGoerli, polygon, mainnet, arbitrum } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'

export type SupportedChainId = (typeof chains)[number]['id']

export const futuresChains = [
  optimism, optimismGoerli
]
export const bridgeChains = [
  polygon, mainnet, arbitrum, optimism
]
export const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [...futuresChains, ...bridgeChains],
  [alchemyProvider({ apiKey: 'Kng1p_dEJaldM51_qK6aqP9YvBY0cVxf' })],
)

export const provider = multicallProvider(_provider, { timeWindow: 1 })
