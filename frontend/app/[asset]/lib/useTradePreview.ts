import { useQuery } from '@tanstack/react-query'
import { Address, getContract, ReadContractResult } from '@wagmi/core'
import { SupportedChainId } from 'app/providers/WagmiProvider'
import { Dnum, equal, from, toJSON } from 'dnum'
import { marketAbi } from 'perps-hooks/abis'
import { market as marketContract } from 'perps-hooks/contracts'
import { valuesToBigInt } from 'perps-hooks/parsers'
import { toBigNumber } from 'utils/toBigNumber'

import { useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'

const parseTradePreview = ({
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
export type TradePreview = ReturnType<typeof parseTradePreview>

const OrderType = {
  atomic: 0,
  delayed: 1,
  delayedOffchain: 2,
}

export function useTradePreview<TSelect = TradePreview>({
  sizeDelta,
  marketPrice,
  account,
  market,
  select,
}: {
  market?: Address
  sizeDelta?: Dnum
  marketPrice?: Dnum
  account?: Address
  select?: (t: TradePreview) => TSelect
}) {
  const { chain } = useNetwork()
  const chainId = !chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId)

  const provider = useProvider({ chainId })

  const enabled = Boolean(account && market && marketPrice && sizeDelta && !equal(sizeDelta, 0))

  return useQuery(
    [
      'postTradeDetails',
      {
        sizeDelta: sizeDelta && toJSON(sizeDelta),
        marketPrice: marketPrice && toJSON(marketPrice),
        account,
        orderType: OrderType.delayedOffchain,
      },
    ],
    async () => {
      if (!account || !market || !marketPrice || !sizeDelta) return
      const result = await getContract({
        address: market,
        abi: marketContract.abi,
        signerOrProvider: provider,
      }).postTradeDetails(
        toBigNumber(sizeDelta),
        toBigNumber(marketPrice),
        OrderType.delayedOffchain,
        account,
      )
      return parseTradePreview(result)
    },
    {
      select,
      enabled,
      keepPreviousData: true,
    },
  )
}
