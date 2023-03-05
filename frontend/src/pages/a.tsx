import { UseQueryOptions } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { marketDataABI, marketDataAddress } from 'perps-hooks'
import { MarketSummaries, parseMarketSummaries } from 'perps-hooks/parsers'
import { Suspense } from 'react'
import { useContractRead, UseContractReadConfig } from 'src/ngmi/useContractRead'
import { SupportedChainId } from 'src/providers/wagmi-config'

import { useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { formatUsd } from '../utils/format'

export const useRouteMarket = () => {
  const searchParams = useSearchParams()
  const asset = searchParams?.get('asset')

  const { data: market } = useMarkets({
    select: (markets) => markets.find((m) => m.asset === asset),
  })

  return market!
}

const useChainId = () => {
  const { chain } = useNetwork()
  const chainId = chain?.unsupported ? optimism.id : (chain?.id as SupportedChainId)
  return chainId
}

export function useMarkets<TSelectData = MarketSummaries>(
  config: Omit<
    UseContractReadConfig<typeof marketDataABI, 'allProxiedMarketSummaries', TSelectData>,
    'abi' | 'address' | 'functionName' | 'select'
  > & {
    chainId?: keyof typeof marketDataAddress
    select: UseQueryOptions<MarketSummaries, unknown, TSelectData>['select']
  } = {} as any,
) {
  const chainId = useChainId()
  return useContractRead({
    abi: marketDataABI,
    address: marketDataAddress[config.chainId || chainId],
    functionName: 'allProxiedMarketSummaries',
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    suspense: true,
    ...config,
    select: (summariesResult) => {
      const summaries = parseMarketSummaries(summariesResult)
      return (config.select ? config.select(summaries) : summaries) as TSelectData
    },
  })
}

const Markets = () => {
  const { data: markets } = useMarkets()

  const searchParams = useSearchParams()
  const routeAsset = searchParams?.get('asset')

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="px-1 text-xs text-neutral-400">Markets</h1>
      <div className="overflow-x-hidden overflow-y-hidden">
        {markets.map(({ address, asset, price }, i) => (
          <Link
            key={address}
            href={`?asset=${asset}`}
            shallow
            data-selected={routeAsset === asset}
            className="flex w-40 items-center justify-between rounded-lg px-2 py-1 hover:bg-neutral-800 data-[selected=true]:bg-neutral-800"
          >
            <span className="text-sm font-semibold text-neutral-200">{asset}</span>
            <div className="flex flex-col items-end">
              <span className="text-xs text-neutral-400">{formatUsd(price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900 font-medium">
      <div className="flex h-[500px] gap-2">
        <Suspense fallback={<span className="text-neutral-200">loading</span>}>
          {/* <Price /> */}
          <Markets />
          {/* <div className="flex h-[500px] w-[300px] flex-col gap-2">
          <ConnectWallet />
          <OPPrice />
          <Orders />
          <Position />
          <Margin />
          <OpenPosition />
        </div> */}
        </Suspense>
      </div>
    </div>
  )
}
