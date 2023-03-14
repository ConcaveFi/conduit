import { useMemo } from 'react'

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { MarketKey, Markets } from 'perps-hooks/markets'

import { useNetwork } from 'wagmi'
import deepEqual from 'fast-deep-equal'
import { routeMarketAtom, useMarkets, useMarketSettings } from './useMarket'
import { wagmiClient } from 'src/app/[asset]/providers/WagmiProvider'
import { add, divide, Dnum, from, multiply } from 'dnum'
import { atom, useAtomValue } from 'jotai'
import { atomWithLocation } from 'jotai-location'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { Router } from 'next/router'
import { atomFamily } from 'jotai/utils'

const pyth = {
  mainnet: new EvmPriceServiceConnection('https://xc-mainnet.pyth.network'),
  testnet: new EvmPriceServiceConnection('https://xc-testnet.pyth.network'),
}
type PythNetwork = keyof typeof pyth

const subscribeOffchainPrice =
  (network: 'mainnet' | 'testnet', marketKey: MarketKey) =>
  (onPriceChange: (price: Dnum) => void) => {
    const id = Markets[marketKey].pythIds[network]
    pyth[network].subscribePriceFeedUpdates([id], (feed) => {
      const { price, expo } = feed.getPriceUnchecked()
      const _price = divide(price, 10 ** Math.abs(expo), 18)
      onPriceChange(_price)
    })
    return () => {
      pyth[network].unsubscribePriceFeedUpdates([id])
    }
  }

const createOffchainPriceAtom = ({
  network,
  marketKey,
  initial = [0n, 0],
}: {
  network: PythNetwork
  marketKey?: MarketKey
  initial?: Dnum
}) => {
  const offchainPriceAtom = atom<Dnum>(initial)
  if (marketKey) offchainPriceAtom.onMount = subscribeOffchainPrice(network, marketKey)
  return offchainPriceAtom
}

const offchainPricesAtom = atomFamily(createOffchainPriceAtom, deepEqual)

export function useOffchainPrice({ marketKey }: { marketKey?: MarketKey }) {
  const { chain } = useNetwork()
  const network = chain?.testnet ? 'testnet' : 'mainnet'
  const { data: price } = useMarkets({
    select: (m) => m.find(({ key }) => key === marketKey)?.price,
  })

  return useAtomValue(offchainPricesAtom({ network, marketKey, initial: price }))
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

const connectedChainIdAtom = atom<number>(optimism.id)
connectedChainIdAtom.onMount = (set) =>
  wagmiClient.subscribe(
    ({ data, chains }) => ({ chainId: data?.chain?.id, chains }),
    ({ chainId }) => set(chainId || optimism.id),
  )

export const routeMarketPriceAtom = atom<Dnum>((get) => {
  const market = get(routeMarketAtom)
  const price = get(
    offchainPricesAtom({ network: 'mainnet', marketKey: market.key, initial: market.price }),
  )
  return price
})
