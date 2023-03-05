import { configureChains } from '@wagmi/core'
import { optimism, optimismGoerli } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { multicallProvider } from 'multicall-provider/wagmi'

const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [optimismGoerli, optimism],
  [alchemyProvider({ apiKey: 'dduxooAO1ELKTf_kXyJHvqIcDniRVvXn' })],
)

const provider = multicallProvider(_provider)

export type SupportedChainId = (typeof chains)[number]['id']
export { chains, provider, webSocketProvider }
