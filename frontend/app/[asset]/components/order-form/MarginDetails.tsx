'use client'

import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@tradex/interface'
import { Address, getContract, Provider } from '@wagmi/core'
import { MAX_LEVERAGE } from 'app/[asset]/constants/perps-config'
import { useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { SupportedChainId } from 'app/providers/wagmi-config'
import { multiply, subtract } from 'dnum'
import { formatBytes32String } from 'ethers/lib/utils.js'
import { marketData } from 'perps-hooks/contracts'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { format } from 'utils/format'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'

const fetchMarginDetails = async (
  account: Address | undefined,
  chainId: SupportedChainId,
  provider: Provider,
  marketKey: MarketKey,
) => {
  if (!account) throw 'not connected'
  const position = await getContract({
    address: marketData.address[chainId],
    abi: marketData.abi,
    signerOrProvider: provider,
  }).positionDetailsForMarketKey(formatBytes32String(marketKey), account)
  const details = parsePositionDetails(position)
  const buyingPower = multiply(details.remainingMargin, MAX_LEVERAGE)
  return {
    buyingPower,
    available: subtract(buyingPower, details.notionalValue),
    accessibleMargin: details.accessibleMargin,
    notionalValue: details.notionalValue,
    remainingMargin: details.remainingMargin,
  }
}

type TMarginDetails = Awaited<ReturnType<typeof fetchMarginDetails>>
export function useMarginDetails<TSelect = TMarginDetails>(
  select?: (m: TMarginDetails) => TSelect,
) {
  const { chain } = useNetwork()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const market = useRouteMarket()
  const { address: account } = useAccount()

  const provider = useProvider<Provider>({ chainId })

  return useQuery(
    ['market position details', market?.key, account, chainId],
    () => fetchMarginDetails(account, chainId, provider, market!.key),
    {
      select,
      enabled: !!account && !!market,
      refetchInterval: 20 * 1000, // 20s
    },
  )
}

export function MarginDetails() {
  const { data: details, isInitialLoading: isLoading } = useMarginDetails()
  const { notionalValue, remainingMargin, available, buyingPower } = details || {}

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-30 ocean:bg-blue-30 flex w-full flex-col gap-1 rounded-lg p-2 text-xs sm:w-auto">
          <span className="text-dark-accent ocean:text-blue-accent">Deposited</span>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-white">$ {format(remainingMargin)}</span>
          )}
        </div>
        <div className="bg-dark-30 ocean:bg-blue-30 flex w-full flex-col gap-1 rounded-lg p-2 text-xs sm:w-auto">
          <span className="text-dark-accent ocean:text-blue-accent">Buying power</span>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-green-400">$ {format(buyingPower)}</span>
          )}
        </div>
        <div className="bg-dark-30 ocean:bg-blue-30 flex w-full flex-col gap-1 rounded-lg p-2 text-xs sm:w-auto">
          <span className="text-dark-accent ocean:text-blue-accent">In position</span>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-red-400">$ {format(notionalValue)}</span>
          )}
        </div>
      </div>
      <div className="bg-dark-30 ocean:bg-blue-30 flex items-center justify-between rounded-lg p-3 text-sm">
        <span className="text-dark-accent ocean:text-blue-accent">Available</span>
        {isLoading ? (
          <Skeleton className="w-20" />
        ) : (
          <span className="font-mono text-white">$ {format(available)}</span>
        )}
      </div>
    </div>
  )
}
