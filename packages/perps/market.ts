import { Address, getContract } from '@wagmi/core'
import { perpsV2MarketAbi } from './abis/marketAbi'
import { utils, BigNumber } from 'ethers'
import { goerliMarketData } from './marketData/marketData'

const { parseBytes32String: decodeBytes32String } = utils

const parseMarket = (market: { key: string; asset: string } & any) => {
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

const createMarket = (marketAddress: Address) => {
  const market = getContract({ address: marketAddress, abi: perpsV2MarketAbi })

  return {
    depositMargin: (amount: bigint) => market.transferMargin(BigNumber.from(amount)),
    withdrawnMargin: (amount: bigint) => market.transferMargin(BigNumber.from(-amount)),

    // submitDelayedOrder (order: any) {
    //   return market.submitDelayedOrder()
    // }
  }
}
