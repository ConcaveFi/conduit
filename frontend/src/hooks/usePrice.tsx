import { useEffect, useMemo, useRef } from 'react'

import { EvmPriceServiceConnection, PriceFeed } from '@pythnetwork/pyth-evm-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MarketKey, Markets } from 'perps-hooks/markets'

import { BigNumber, FixedNumber } from 'ethers'
import { useNetwork } from 'wagmi'

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

const createPriceQuery = (ids?: PythId[], network: PythNetwork = 'mainnet') => ({
  queryKey: ['pyth', { ids }],
  enabled: !!ids,
  queryFn: async () => {
    const feeds = await pyth[network].getLatestPriceFeeds(ids!)
    if (!feeds) return ids!.map((id) => ({ id, price: FixedNumber.from(0) }))
    return feeds.map(parsePriceFeed)
  },
})

const allMarketsKeys = Object.keys(Markets) as MarketKey[]
const allMarketsPythIds = {
  mainnet: allMarketsKeys.map((key) => Markets[key].pythIds.mainnet),
  testnet: allMarketsKeys.map((key) => Markets[key].pythIds.testnet),
}
const allMarketsPricesQuery = createPriceQuery(allMarketsPythIds.mainnet, 'mainnet')

// export const prefetchPrices = () => global_queryClient.prefetchQuery(allMarketsPricesQuery)

export function useOffchainPrice<TSelect = ParsedPriceFeed>({
  marketKey,
  watch,
  select,
}: {
  marketKey?: MarketKey
  watch?: boolean
  select?: (priceFeed: ParsedPriceFeed) => TSelect
}) {
  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'
  const marketPythId = marketKey && Markets[marketKey].pythIds[pythNetwork]

  const marketPriceQuery = useMemo(
    () => createPriceQuery(marketPythId && [marketPythId], pythNetwork),
    [marketPythId, pythNetwork],
  )

  const queryClient = useQueryClient()

  useWatchOffchainPrice({
    pythId: marketPythId,
    network: pythNetwork,
    enabled: !!watch,
    onPriceChange: (priceFeed) => {
      queryClient.setQueryData(marketPriceQuery.queryKey, [priceFeed])
    },
  })

  return useQuery({
    ...marketPriceQuery,
    initialData: () => {
      const allFeeds = queryClient.getQueryData<ParsedPriceFeed[]>(allMarketsPricesQuery.queryKey)
      const feed = allFeeds?.find((m) => m.id === marketPythId)
      return feed ? [feed] : undefined
    },
    select: (priceFeeds) => {
      const feed = priceFeeds?.find((f) => f.id === marketPythId)
      const result = !!feed
        ? { id: feed.id, price: FixedNumber.from(feed.price._value) }
        : { id: marketPythId as PythId, price: FixedNumber.from(0) }
      return (select ? select(result) : result) as TSelect
    },
  })
}

export const useWatchOffchainPrice = ({
  pythId,
  network = 'mainnet',
  enabled = true,
  onPriceChange,
}: {
  pythId?: PythId
  network?: PythNetwork
  enabled?: boolean
  onPriceChange: (priceFeed: ParsedPriceFeed) => void
}) => {
  const _onPriceChange = useRef(onPriceChange)
  _onPriceChange.current = onPriceChange

  useEffect(() => {
    if (!enabled || !pythId || !_onPriceChange.current) return

    pyth[network].subscribePriceFeedUpdates([pythId], (priceFeed) => {
      _onPriceChange.current(parsePriceFeed(priceFeed))
    })
    // pyth.onWsError() TODO: handle this somehow

    return () => {
      pyth[network].unsubscribePriceFeedUpdates([pythId])
    }
  }, [network, pythId, enabled])
}
