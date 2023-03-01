import { ContractConfig, defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20ABI } from 'wagmi'

import { optimism, optimismGoerli } from 'wagmi/chains'
import { chainLinkFeedAbi, marketAbi, marketDataAbi, marketSettingsAbi } from './abis'

const tokens = [
  {
    name: 'SUSD',
    abi: erc20ABI,
    address: {
      [optimism.id]: '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
      [optimismGoerli.id]: '0xeBaEAAD9236615542844adC5c149F86C36aD1136',
    },
  },
  {
    name: 'OP',
    abi: erc20ABI,
    address: {
      [optimism.id]: '0x4200000000000000000000000000000000000042',
      [optimismGoerli.id]: '0x4200000000000000000000000000000000000042',
    },
  },
] satisfies ContractConfig[]

const contracts = [
  ...tokens,
  {
    name: 'MarketData',
    abi: marketDataAbi,
    address: {
      [optimismGoerli.id]: '0xc880Cd434eD843398a2E20C8C617E6a9C2690A23',
      [optimism.id]: '0xF7D3D05cCeEEcC9d77864Da3DdE67Ce9a0215A9D',
    },
  },
  {
    name: 'MarketSettings',
    abi: marketSettingsAbi,
    address: {
      [optimismGoerli.id]: '0xcE6F78bbc9080891b6732D27e5Ca7e866594F927',
      [optimism.id]: '0x09793Aad1518B8d8CC72FDd356479E3CBa7B4Ad1',
    },
  },

  { name: 'ChainLink', abi: chainLinkFeedAbi },
  { name: 'Market', abi: marketAbi },
] satisfies ContractConfig[]

export default defineConfig({
  out: 'perps-hooks/generated.ts',
  contracts,
  plugins: [react()],
})
