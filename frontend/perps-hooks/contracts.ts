import { optimismGoerli, optimism } from '@wagmi/core/chains'
import {
  chainLinkFeedAbi,
  marketAbi,
  marketDataAbi,
  marketSettingsAbi,
  systemStatusAbi,
} from './abis'

export const marketData = {
  abi: marketDataAbi,
  address: {
    [optimismGoerli.id]: '0xc880Cd434eD843398a2E20C8C617E6a9C2690A23',
    [optimism.id]: '0xF7D3D05cCeEEcC9d77864Da3DdE67Ce9a0215A9D',
  },
}

export const marketSettings = {
  abi: marketSettingsAbi,
  address: {
    [optimismGoerli.id]: '0xcE6F78bbc9080891b6732D27e5Ca7e866594F927',
    [optimism.id]: '0x09793Aad1518B8d8CC72FDd356479E3CBa7B4Ad1',
  },
}

export const systemStatus = {
  abi: systemStatusAbi,
  address: {
    [optimism.id]: '0xE8c41bE1A167314ABAF2423b72Bf8da826943FFD',
    [optimismGoerli.id]: '0x9D89fF8C6f3CC22F4BbB859D0F85FB3a4e1FA916',
  },
}

export const chainLinkFeed = { abi: chainLinkFeedAbi }
export const market = { abi: marketAbi }
