import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react'

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MarketKey, Markets } from 'perps-hooks/markets'

import { useNetwork } from 'wagmi'
import { marketsQueryKey, MarketSummaries, useMarkets, useMarketSettings } from './useMarket'
import { SupportedChainId, wagmiClient } from 'src/providers/WagmiProvider'
import { add, divide, Dnum, multiply, subtract, greaterThan, abs, format } from 'dnum'
import { atom, useAtomValue } from 'jotai'
import { atomWithHash, atomWithLocation } from 'jotai-location'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { Router } from 'next/router'

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
  const marketPythId = marketKey && Markets[marketKey].pythIds['mainnet']

  return useAtomValue(
    offchainPricesAtoms['mainnet'][
      marketPythId || '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'
    ],
  )
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
  const price = useOffchainPrice({ marketKey })

  return useMemo(() => {
    if (!marketSkew || !skewScale) return undefined
    const skew = add(divide(marketSkew, skewScale), 1)
    const skewAdjustedPrice = multiply(price, skew)
    return select ? select(skewAdjustedPrice) : (skewAdjustedPrice as TSelect)
  }, [price, select])
}

const allMarketsKeys = Object.keys(Markets) as MarketKey[]
const allMarketsPythIds = {
  mainnet: allMarketsKeys.map((key) => Markets[key].pythIds.mainnet),
  testnet: allMarketsKeys.map((key) => Markets[key].pythIds.testnet),
}

const connectedChainIdAtom = atom<number>(optimism.id)
connectedChainIdAtom.onMount = (set) =>
  wagmiClient.subscribe(
    ({ data, chains }) => ({ chainId: data?.chain?.id, chains }),
    ({ chainId }) => set(chainId || optimism.id),
  )

const subscribeOffchainPrice =
  (network: 'mainnet' | 'testnet', id: PythId) => (onPriceChange: (price: Dnum) => void) => {
    console.log('subscribed', id)
    pyth[network].subscribePriceFeedUpdates([id], (feed) => {
      const { price, expo } = feed.getPriceUnchecked()
      const _price = divide(price, 10 ** Math.abs(expo), 18)
      onPriceChange(_price)
    })
    return () => {
      console.log('unsubscribed', id)
      pyth[network].unsubscribePriceFeedUpdates([id])
    }
  }

const createOffchainPriceAtom = (network: 'mainnet' | 'testnet', id: PythId) => {
  const offchainPriceAtom = atom<Dnum>([0n, 0])
  offchainPriceAtom.onMount = subscribeOffchainPrice(network, id)
  return offchainPriceAtom
}

export const offchainPricesAtoms = {
  mainnet: allMarketsPythIds.mainnet.reduce(
    (acc, id) => ({ ...acc, [id]: createOffchainPriceAtom('mainnet', id) }),
    {} as Record<PythId, ReturnType<typeof createOffchainPriceAtom>>,
  ),
  testnet: allMarketsPythIds.mainnet.reduce(
    (acc, id) => ({ ...acc, [id]: createOffchainPriceAtom('testnet', id) }),
    {} as Record<PythId, ReturnType<typeof createOffchainPriceAtom>>,
  ),
}

const routeAtom = atomWithLocation({
  subscribe: (callback) => {
    Router.events.on('routeChangeComplete', callback)
    window.addEventListener('hashchange', callback)
    return () => {
      Router.events.off('routeChangeComplete', callback)
      window.removeEventListener('hashchange', callback)
    }
  },
})

export const routeMarketPriceAtom = atom<Dnum>((get) => {
  const chainId = get(connectedChainIdAtom)
  const network = 'mainnet' // chainId === optimismGoerli.id ? 'testnet' : 'mainnet'
  const asset = get(routeAtom).searchParams?.get('asset') || 'sETH'
  const pythId = Object.values(Markets).find((m) => m.asset === asset)?.pythIds[network]
  if (!pythId) return [0n, 0]
  const price = get(offchainPricesAtoms[network][pythId])
  console.log(asset, format(price))
  return price
})

// const offchainPriceAtom = atom()
// offchainPriceAtom.onMount

export function OffchainPricesProvider({ children }: PropsWithChildren<{}>) {
  // const { chain } = useNetwork()
  // const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'

  // const queryClient = useQueryClient()

  // useEffect(() => {
  //   pyth[pythNetwork].subscribePriceFeedUpdates(allMarketsPythIds[pythNetwork], (feed) => {
  //     const { price, expo } = feed.getPriceUnchecked()
  //     const _price = divide(price, 10 ** Math.abs(expo), 18)
  //     const id = (feed.id.startsWith('0x') ? feed.id : `0x${feed.id}`) as PythId
  //     const lastPrice = queryClient.getQueryData<Dnum>(priceQueryKey(id))
  //     // if (
  //     //   lastPrice &&
  //     //   greaterThan(abs(multiply(divide(subtract(lastPrice, price), abs(lastPrice)), 100)), 0.1)
  //     // )
  //     queryClient.setQueryData(priceQueryKey(id), _price)
  //   })
  //   return () => {
  //     pyth[pythNetwork].unsubscribePriceFeedUpdates(allMarketsPythIds[pythNetwork])
  //   }
  // }, [pythNetwork, queryClient])

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
