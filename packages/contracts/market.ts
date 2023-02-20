import { Address, getContract } from '@wagmi/core'
import { perpsV2MarketAbi } from './abis/marketAbi'
import { utils, BigNumber } from 'ethers'
import { goerliMarketData } from './marketData/marketData'
import { bpsToWei, Percent } from './percent'

const { parseBytes32String: decodeBytes32String, formatBytes32String: encodeBytes32String } = utils
const n = BigNumber.from

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

const DEFAULT_PRICE_IMPACT_DELTA: Percent = 50 // 0.5%

export const marketActions = (marketAddress: Address) => {
  const market = getContract({ address: marketAddress, abi: perpsV2MarketAbi })

  return {
    depositMargin: (amount: bigint) => market.transferMargin(n(amount)),
    withdrawnMargin: (amount: bigint) => market.transferMargin(n(-amount)),
    managePosition: (
      size: bigint,
      priceImpact: Percent = DEFAULT_PRICE_IMPACT_DELTA,
      trackingCode: Bytes32 = TrackingCode,
    ) =>
      market.submitOffchainDelayedOrderWithTracking(
        n(size),
        n(bpsToWei(priceImpact)),
        trackingCode,
      ),
  }
}
