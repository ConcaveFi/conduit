import { defineConfig, ContractConfig } from '@wagmi/cli'
import { react, erc } from '@wagmi/cli/plugins'

import { optimismGoerli } from 'wagmi/chains'
import { marketAbi, marketDataAbi, marketSettingsAbi } from './abis'

const contracts = [
  {
    name: 'MarketData',
    abi: marketDataAbi,
    address: {
      [optimismGoerli.id]: '0x0D9eFa310a4771c444233B10bfB57e5b991ad529',
    },
  },
  {
    name: 'MarketSettings',
    abi: marketSettingsAbi,
    address: {
      [optimismGoerli.id]: '0x14fA3376E2ffa41708A0636009A35CAE8D8E2bc7',
    },
  },
  { name: 'Market', abi: marketAbi },
] satisfies ContractConfig[]

export default defineConfig({ out: 'perps-hooks/index.ts', contracts, plugins: [erc(), react()] })