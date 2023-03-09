import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { EvmPriceServiceConnection, PriceFeed } from '@pythnetwork/pyth-evm-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MarketKey, Markets } from 'perps-hooks/markets'

import { BigNumber, FixedNumber } from 'ethers'
import { useNetwork } from 'wagmi'
import { useMarkets, useMarketSettings } from './useMarket'
import { queryClient } from 'src/providers'

const pyth = {
  mainnet: new EvmPriceServiceConnection('https://xc-mainnet.pyth.network'),
  testnet: new EvmPriceServiceConnection('https://xc-testnet.pyth.network'),
}
type PythNetwork = 'mainnet' | 'testnet'
type PythId = (typeof Markets)[MarketKey]['pythIds'][PythNetwork]

const parsePriceFeed = (feed: PriceFeed) => {
  const { price, expo } = feed.getPriceUnchecked()
  return {
    id: (feed.id.startsWith('0x') ? feed.id : `0x${feed.id}`) as PythId,
    price: FixedNumber.fromValue(BigNumber.from(price), Math.abs(expo)),
  }
}
type ParsedPriceFeed = ReturnType<typeof parsePriceFeed>

const priceQueryKey = (ids?: PythId[]) => ['pyth', ids]
const createPythPricesQuery = (ids?: PythId[], network: PythNetwork = 'mainnet') => ({
  queryKey: priceQueryKey(ids),
  queryFn: async () => {
    const feeds = await pyth[network].getLatestPriceFeeds(ids!)
    if (!feeds) return ids?.map((id) => ({ id, price: FixedNumber.from(0) }))
    return feeds.map(parsePriceFeed)
  },
})

const allMarketsKeys = Object.keys(Markets) as MarketKey[]
const allMarketsPythIds = {
  mainnet: allMarketsKeys.map((key) => Markets[key].pythIds.mainnet),
  testnet: allMarketsKeys.map((key) => Markets[key].pythIds.testnet),
}
const allMarketsPricesQuery = createPythPricesQuery(allMarketsPythIds.mainnet, 'mainnet')

export const prefetchPrices = () => queryClient.prefetchQuery(allMarketsPricesQuery)

const ZERO = FixedNumber.from(0)
const ONE = FixedNumber.from(1)

export function useOffchainPrice<TSelect = FixedNumber>({
  marketKey,
  enabled = true,
  select,
}: {
  marketKey?: MarketKey
  enabled?: boolean
  select?: (priceFeed: FixedNumber) => TSelect
}) {
  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'
  const marketPythId = marketKey && Markets[marketKey].pythIds[pythNetwork]

  const marketPriceQuery = useMemo(
    () => createPythPricesQuery(marketPythId && [marketPythId], pythNetwork),
    [marketPythId, pythNetwork],
  )

  const queryClient = useQueryClient()

  return useQuery({
    ...marketPriceQuery,
    enabled: enabled && !!marketPythId,
    initialData: () => {
      const allFeeds = queryClient.getQueryData<ParsedPriceFeed[]>(allMarketsPricesQuery.queryKey)
      const feed = allFeeds?.find((m) => m.id === marketPythId)
      return feed ? [feed] : undefined
    },
    select: (priceFeeds) => {
      if (!priceFeeds) return ZERO
      const feed = priceFeeds.find((f) => f.id === marketPythId)
      const result = !!feed ? FixedNumber.from(feed.price._value) : ZERO
      return (select ? select(result) : result) as TSelect
    },
  })
}

export function useSkewAdjustedOffChainPrice({ marketKey }: { marketKey?: MarketKey }) {
  const { data: market } = useMarkets({ select: (m) => m.find(({ key }) => key === marketKey) })
  const { data: settings } = useMarketSettings({ marketKey })

  return useOffchainPrice({
    marketKey,
    enabled: !!market && !!settings,
    select: (price) => {
      if (!market || !settings) return undefined
      const skew = market.marketSkew.divUnsafe(settings.skewScale).addUnsafe(ONE)
      return price.mulUnsafe(skew)
    },
  })
}

export function OffchainPricesProvider({ children }: PropsWithChildren<{}>) {
  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'

  const queryClient = useQueryClient()

  useEffect(() => {
    pyth[pythNetwork].subscribePriceFeedUpdates(allMarketsPythIds[pythNetwork], (priceFeed) => {
      const feed = parsePriceFeed(priceFeed)
      queryClient.setQueryData(priceQueryKey([feed.id]), [feed])
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
