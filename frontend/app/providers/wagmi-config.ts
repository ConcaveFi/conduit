import { configureChains } from '@wagmi/core'
import { mainnet, optimism, optimismGoerli } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'

export type SupportedChainId = (typeof chains)[number]['id']

export const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [optimism, optimismGoerli, mainnet],
  [alchemyProvider({ apiKey: 'Kng1p_dEJaldM51_qK6aqP9YvBY0cVxf' })],
)

export const provider = multicallProvider(_provider, { timeWindow: 1 })
