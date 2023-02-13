import { optimism, optimismGoerli } from 'wagmi/chains'
import { getContract } from '@wagmi/core'
import { marketDataAbi } from './marketDataAbi'

export const goerliMarketData = getContract({
  address: '0x0D9eFa310a4771c444233B10bfB57e5b991ad529',
  abi: marketDataAbi,
})
