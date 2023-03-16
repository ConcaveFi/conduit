import { useMemo } from 'react'

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { MarketKey, PythId, PythIdsByMarketKey, PythNetwork } from './pyth'

import { wagmiClient } from 'app/providers/WagmiProvider'
import { add, divide, Dnum, multiply } from 'dnum'
import deepEqual from 'fast-deep-equal'
import { atom, useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { useNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { routeMarketAtom, useMarkets, useMarketSettings } from '../market/useMarket'

const pyth = {
  mainnet: new EvmPriceServiceConnection('https://xc-mainnet.pyth.network'),
  testnet: new EvmPriceServiceConnection('https://xc-testnet.pyth.network'),
}

const subscribeOffchainPricesEffect =
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

type OffchainPriceAtomParam = { network: PythNetwork; id?: PythId; initial?: Dnum }
export const offchainPricesAtom = atomFamily(({ network, id, initial }: OffchainPriceAtomParam) => {
  const offchainPriceAtom = atom<Dnum>(initial || [0n, 0])
  if (id) offchainPriceAtom.onMount = subscribeOffchainPricesEffect(network, id)
  return offchainPriceAtom
}, deepEqual)

export function useMarketIndexPrice({ marketKey }: { marketKey?: MarketKey }) {
  const { chain } = useNetwork()
  const network = chain?.testnet ? 'testnet' : 'mainnet'
  const { data: price } = useMarkets({
    select: (m) => m.find(({ key }) => key === marketKey)?.price,
  })

  return useAtomValue(
    offchainPricesAtom({
      network,
      id: marketKey && PythIdsByMarketKey[marketKey][network],
      initial: price,
    }),
  )
}

export function useMarketPrice<TSelect = Dnum>({
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
  const price = useMarketIndexPrice({ marketKey })

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
  const chainId = get(connectedChainIdAtom)
  const network = chainId === optimismGoerli.id ? 'testnet' : 'mainnet'
  const price = get(
    offchainPricesAtom({
      network,
      id: PythIdsByMarketKey[market.key][network],
      initial: market.price,
    }),
  )
  return price
})
