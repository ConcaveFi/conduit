import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { MarketKey, PythId, PythIdsByMarketKey, PythNetwork } from './pyth'

import { add, divide, Dnum, multiply } from 'dnum'
import deepEqual from 'fast-deep-equal'
import { atom, useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { optimismGoerli } from 'wagmi/chains'
import { connectedChainAtom } from '../jotai-wagmi'
import { marketAtoms, marketSettingsAtoms, routeMarketKeyAtom } from '../market/useMarket'

const pyth = {
  mainnet: new EvmPriceServiceConnection('https://xc-mainnet.pyth.network'),
  testnet: new EvmPriceServiceConnection('https://xc-testnet.pyth.network'),
}

const subscribeindexPricesEffect =
  (network: PythNetwork, id: PythId) => (onPriceChange: (price: Dnum) => void) => {
    pyth[network].subscribePriceFeedUpdates([id], (feed) => {
      const { price, expo } = feed.getPriceUnchecked()
      const _price = divide(price, 10 ** Math.abs(expo), 18)
      onPriceChange(_price)
    })
    return () => {
      pyth[network].unsubscribePriceFeedUpdates([id])
    }
  }

type IndexPriceAtomParam = { network: PythNetwork; id?: PythId; initial?: Dnum }
export const indexPricesAtom = atomFamily(({ network, id, initial }: IndexPriceAtomParam) => {
  const indexPriceAtom = atom<Dnum>(initial || [0n, 0])
  if (id) indexPriceAtom.onMount = subscribeindexPricesEffect(network, id)
  return indexPriceAtom
}, deepEqual)

const marketIndexPriceAtom = atomFamily((marketKey?: MarketKey) => {
  return atom((get): Dnum => {
    if (!marketKey) return [0n, 0]

    const market = get(marketAtoms(marketKey)).data
    if (!market) return [0n, 0]

    const chain = get(connectedChainAtom)
    const network = chain?.id === optimismGoerli.id ? 'testnet' : 'mainnet'

    const price = get(
      indexPricesAtom({
        network,
        id: PythIdsByMarketKey[market.key][network],
        initial: market.price,
      }),
    )

    return price
  })
})

const marketPriceAtom = atomFamily((marketKey?: MarketKey) => {
  return atom((get): Dnum => {
    if (!marketKey) return [0n, 0]

    const market = get(marketAtoms(marketKey)).data
    if (!market) return [0n, 0]

    const { data: marketSettings } = get(marketSettingsAtoms(marketKey))
    const indexPrice = get(marketIndexPriceAtom(marketKey))

    if (!market.marketSkew || !marketSettings?.skewScale || !indexPrice) return [0n, 0]
    const skew = add(divide(market.marketSkew, marketSettings.skewScale), 1)
    const skewAdjustedPrice = multiply(indexPrice, skew)

    return skewAdjustedPrice
  })
})

export const routeMarketIndexPriceAtom = atom<Dnum>((get) =>
  get(marketIndexPriceAtom(get(routeMarketKeyAtom))),
)

export const routeMarketPriceAtom = atom<Dnum>((get) =>
  get(marketPriceAtom(get(routeMarketKeyAtom))),
)

export function useMarketIndexPrice({ marketKey }: { marketKey?: MarketKey }) {
  return useAtomValue(marketIndexPriceAtom(marketKey))
}

export function useMarketPrice({ marketKey }: { marketKey?: MarketKey }) {
  return useAtomValue(marketPriceAtom(marketKey))
}
