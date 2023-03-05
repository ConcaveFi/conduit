import { configureChains } from '@wagmi/core'
import { optimism } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'

const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains([optimism], [alchemyProvider({ apiKey: 'Kng1p_dEJaldM51_qK6aqP9YvBY0cVxf' })])

const provider = multicallProvider(_provider)

export type SupportedChainId = (typeof chains)[number]['id']
export { chains, provider, webSocketProvider }
