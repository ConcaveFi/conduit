import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react'

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MarketKey, Markets } from 'perps-hooks/markets'

import { useNetwork } from 'wagmi'
import { marketsQueryKey, MarketSummaries, useMarkets, useMarketSettings } from './useMarket'
import { SupportedChainId } from 'src/providers/WagmiProvider'
import { add, divide, Dnum, multiply, subtract, greaterThan, abs } from 'dnum'

const pyth = {
  mainnet: new EvmPriceServiceConnection('https://xc-mainnet.pyth.network'),
  testnet: new EvmPriceServiceConnection('https://xc-testnet.pyth.network'),
}
type PythNetwork = 'mainnet' | 'testnet'
type PythId = (typeof Markets)[MarketKey]['pythIds'][PythNetwork]

const priceQueryKey = (id?: PythId) => ['pyth', id]

export function useOffchainPrice<TSelect = Dnum>({
  marketKey,
  enabled = true,
  select,
}: {
  marketKey?: MarketKey
  enabled?: boolean
  select?: (price: Dnum) => TSelect
}) {
  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'
  const marketPythId = marketKey && Markets[marketKey].pythIds[pythNetwork]

  const queryClient = useQueryClient()

  return useQuery({
    queryKey: priceQueryKey(marketPythId),
    enabled: enabled && !!marketPythId,
    initialData: () => {
      const queryKey = marketsQueryKey((chain?.id as SupportedChainId) || 10)
      const markets = queryClient.getQueryData<MarketSummaries>(queryKey)
      const market = markets?.find((m) => m.key === marketKey)
      return market?.price
    },
    select: select,
    staleTime: Infinity,
  })
}

export function useSkewAdjustedOffChainPrice<TSelect = Dnum>({
  marketKey,
  select,
}: {
  marketKey?: MarketKey
  select?: (price: Dnum) => TSelect
}) {
  const { data: marketSkew } = useMarkets({
    select: (m) => m.find(({ key }) => key === marketKey)?.marketSkew,
  })
  const { data: skewScale } = useMarketSettings({ marketKey, select: (s) => s.skewScale })

  return useOffchainPrice({
    marketKey,
    enabled: !!marketSkew && !!skewScale,
    select: (price) => {
      if (!marketSkew || !skewScale) return undefined
      const skew = add(divide(marketSkew, skewScale), 1)
      const skewAdjustedPrice = multiply(price, skew)
      return select ? select(skewAdjustedPrice) : (skewAdjustedPrice as TSelect)
    },
  })
}

const allMarketsKeys = Object.keys(Markets) as MarketKey[]
const allMarketsPythIds = {
  mainnet: allMarketsKeys.map((key) => Markets[key].pythIds.mainnet),
  testnet: allMarketsKeys.map((key) => Markets[key].pythIds.testnet),
}

export function OffchainPricesProvider({ children }: PropsWithChildren<{}>) {
  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'

  const queryClient = useQueryClient()

  useEffect(() => {
    pyth[pythNetwork].subscribePriceFeedUpdates(allMarketsPythIds[pythNetwork], (feed) => {
      const { price, expo } = feed.getPriceUnchecked()
      const _price = divide(price, 10 ** Math.abs(expo), 18)
      const id = (feed.id.startsWith('0x') ? feed.id : `0x${feed.id}`) as PythId
      const lastPrice = queryClient.getQueryData<Dnum>(priceQueryKey(id))
      // if (
      //   lastPrice &&
      //   greaterThan(abs(multiply(divide(subtract(lastPrice, price), abs(lastPrice)), 100)), 0.1)
      // )
      queryClient.setQueryData(priceQueryKey(id), _price)
    })
    return () => {
      pyth[pythNetwork].unsubscribePriceFeedUpdates(allMarketsPythIds[pythNetwork])
    }
  }, [pythNetwork, queryClient])

  return <>{children}</>
}

// function useWatchOffchainPrice({ pythId }: { pythId: PythId | undefined }) {
//   const { watch, unwatch } = useContext(OffchainPricesContext)
//   useEffect(() => {
//     if (!pythId) return
//     watch(pythId)
//     return () => unwatch(pythId)
//   })
// }
