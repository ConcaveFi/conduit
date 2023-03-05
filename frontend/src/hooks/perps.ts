import { UseQueryOptions } from '@tanstack/react-query'
import { ReadContractResult } from '@wagmi/core'
import { useSearchParams } from 'next/navigation'
import { useContractRead, UseContractReadConfig } from 'ngmi/useContractRead'
import { marketDataABI, marketDataAddress } from 'perps-hooks'
import { MarketSummaries, parseMarketSummaries } from 'perps-hooks/parsers'
import { SupportedChainId } from 'src/providers/wagmi-config'

import { useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'

export function useMarkets<TSelectData = MarketSummaries>(
  config: Omit<
    UseContractReadConfig<typeof marketDataABI, 'allProxiedMarketSummaries', ReadContractResult>,
    'abi' | 'address' | 'functionName' | 'select'
  > & {
    chainId?: keyof typeof marketDataAddress
    select?: UseQueryOptions<MarketSummaries, unknown, TSelectData>['select']
  } = {},
) {
  const { chain } = useNetwork()
  const chainId = chain?.unsupported ? optimism.id : (chain?.id as SupportedChainId)
  return useContractRead({
    abi: marketDataABI,
    address: marketDataAddress[config.chainId || chainId],
    functionName: 'allProxiedMarketSummaries',
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    ...config,
    select: (summariesResult) => {
      const summaries = parseMarketSummaries(summariesResult)
      return config.select ? config.select(summaries) : (summaries as TSelectData)
    },
  })
}

export const useRouteMarket = () => {
  const searchParams = useSearchParams()
  const asset = searchParams?.get('asset')

  const { data: market } = useMarkets({
    select: (markets) => markets.find((m) => m.asset === asset),
  })

  return market!
}
