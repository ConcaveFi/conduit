import { useMemo } from 'react'

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { MarketKey, Markets } from 'perps-hooks/markets'

import { useNetwork } from 'wagmi'
import { useMarkets, useMarketSettings } from './useMarket'
import { wagmiClient } from 'src/app/[asset]/providers/WagmiProvider'
import { add, divide, Dnum, multiply } from 'dnum'
import { atom, useAtomValue } from 'jotai'
import { atomWithLocation } from 'jotai-location'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { Router } from 'next/router'

const pyth = {
  mainnet: new EvmPriceServiceConnection('https://xc-mainnet.pyth.network'),
  testnet: new EvmPriceServiceConnection('https://xc-testnet.pyth.network'),
}
type PythNetwork = 'mainnet' | 'testnet'
type PythId = (typeof Markets)[MarketKey]['pythIds'][PythNetwork]

export function useOffchainPrice({ marketKey }: { marketKey?: MarketKey }) {
  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'
  const marketPythId = marketKey && Markets[marketKey].pythIds[pythNetwork]

  const fallbackAtom = useMemo(() => atom([0n, 0] as Dnum), [])
  return useAtomValue(marketPythId ? offchainPricesAtoms[pythNetwork][marketPythId] : fallbackAtom)
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
    if (!marketSkew || !skewScale || !price) return undefined
    const skew = add(divide(marketSkew, skewScale), 1)
    const skewAdjustedPrice = multiply(price, skew)
    return select ? select(skewAdjustedPrice) : (skewAdjustedPrice as TSelect)
  }, [marketSkew, price, select, skewScale])
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
    pyth[network].subscribePriceFeedUpdates([id], (feed) => {
      const { price, expo } = feed.getPriceUnchecked()
      const _price = divide(price, 10 ** Math.abs(expo), 18)
      onPriceChange(_price)
    })
    return () => {
      pyth[network].unsubscribePriceFeedUpdates([id])
    }
  }

const createOffchainPriceAtom = (network: 'mainnet' | 'testnet', id: PythId) => {
  const offchainPriceAtom = atom<Dnum>([0n, 0])
  // offchainPriceAtom.onMount = subscribeOffchainPrice(network, id)
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
  const network = chainId === optimismGoerli.id ? 'testnet' : 'mainnet'
  const asset = get(routeAtom).searchParams?.get('asset') || 'sETH'
  const pythId = Object.values(Markets).find((m) => m.asset === asset)?.pythIds[network]
  if (!pythId) return [0n, 0]
  const price = get(offchainPricesAtoms[network][pythId])
  return price
})
