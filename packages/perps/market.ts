import { Address, getContract } from '@wagmi/core'
import { perpsV2MarketAbi } from './abis/marketAbi'
import { utils, BigNumber } from 'ethers'
import { goerliMarketData } from './marketData/marketData'

const { parseBytes32String: decodeBytes32String, formatBytes32String: encodeBytes32String } = utils

type Bytes32 = `0x${string}`

type MarketSummary = Awaited<ReturnType<typeof goerliMarketData.allProxiedMarketSummaries>>[number]

const parseMarket = (market: MarketSummary) => {
  return {
    ...market,
    key: decodeBytes32String(market.key),
    asset: decodeBytes32String(market.asset),
  }
}

export const marketsSummaries = async () => {
  const allMarketsSummaries = await goerliMarketData.allProxiedMarketSummaries()
  return allMarketsSummaries.map(parseMarket)
}

const TrackingCode = encodeBytes32String('tradex') as Bytes32
const DEFAULT_PRICE_IMPACT_DELTA = 500000000000000000n

export const marketActions = (marketAddress: Address) => {
  const market = getContract({ address: marketAddress, abi: perpsV2MarketAbi })

  return {
    depositMargin: (amount: bigint) => market.transferMargin(BigNumber.from(amount)),
    withdrawnMargin: (amount: bigint) => market.transferMargin(BigNumber.from(-amount)),
    openPosition: (
      size: bigint,
      priceImpact: bigint = DEFAULT_PRICE_IMPACT_DELTA,
      trackingCode: Bytes32 = TrackingCode,
    ) =>
      market.submitOffchainDelayedOrderWithTracking(
        BigNumber.from(size),
        BigNumber.from(priceImpact),
        trackingCode,
      ),
  }
}
