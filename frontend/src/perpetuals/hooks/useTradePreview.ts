import { ReadContractResult } from '@wagmi/core'
import { FixedNumber } from 'ethers'
import { useContractRead, UseContractReadConfig } from 'ngmi/useContractRead'
import { marketDataAddress } from 'perps-hooks'
import { marketAbi } from 'perps-hooks/abis'
import { SupportedChainId } from 'src/providers/WagmiProvider'

import { useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'

const select = (d: ReadContractResult<typeof marketAbi, 'postTradeDetails'>) => ({
  fee: FixedNumber.fromValue(d.fee, 18),
  entryPrice: FixedNumber.fromValue(d.price, 18),
  liquidationPrice: FixedNumber.fromValue(d.liqPrice, 18),
})

export function useTradePreview({
  ...config
}: Omit<
  UseContractReadConfig<typeof marketAbi, 'postTradeDetails', ReadContractResult>,
  'abi' | 'functionName'
> & {
  chainId?: keyof typeof marketDataAddress
} = {}) {
  const { chain } = useNetwork()
  const chainId =
    config.chainId || (!chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId))

  return useContractRead({
    abi: marketAbi,
    chainId,
    functionName: 'postTradeDetails',
    ...config,
    select,
  })
}
