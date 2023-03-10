import { ReadContractResult } from '@wagmi/core'
import { from } from 'dnum'
import { useContractRead, UseContractReadConfig } from 'ngmi/useContractRead'
import { marketDataAddress } from 'perps-hooks'
import { marketAbi } from 'perps-hooks/abis'
import { valuesToBigInt } from 'perps-hooks/parsers'
import { SupportedChainId } from 'src/providers/WagmiProvider'

import { useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'

const select = ({
  fee,
  liqPrice,
  price,
  margin,
  size,
}: ReadContractResult<typeof marketAbi, 'postTradeDetails'>) => {
  const d = valuesToBigInt({ fee, liqPrice, price, margin, size })
  return {
    fee: from([d.fee, 18]),
    entryPrice: from([d.price, 18]),
    liquidationPrice: from([d.liqPrice, 18]),
  }
}

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
