import { getContract, Provider, ReadContractResult } from '@wagmi/core'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { SupportedChainId } from 'app/[asset]/providers/wagmi-config'
import { divide, from } from 'dnum'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils'
import { marketData, marketSettings } from 'perps-hooks/contracts'
import { valuesToBigInt } from 'perps-hooks/parsers'

// ---------- Market Summaries ----------

export type MarketSummariesResult = ReadContractResult<
  typeof marketData.abi,
  'allProxiedMarketSummaries'
>
const parseMarketSummaries = (summaries: MarketSummariesResult) =>
  summaries.map(({ key, asset, feeRates, market: address, ..._market }) => {
    const m = valuesToBigInt(_market)
    const fee = valuesToBigInt(feeRates)
    return {
      address: address,
      key: parseBytes32String(key) as MarketKey,
      asset: parseBytes32String(asset) as string,
      feeRates: {
        // ----- we only doing offchain delayed orders rn -----
        // takerFee: from([fee.takerFee, 18]),
        // makerFee:  from([fee.makerFee, 18]),
        // takerFeeDelayedOrder:  from([fee.takerFeeDelayedOrder, 18]),
        // makerFeeDelayedOrder:  from([fee.makerFeeDelayedOrder, 18]),
        // ----------------------------------------------------
        takerFeeOffchainDelayedOrder: from([fee.takerFeeOffchainDelayedOrder, 18]),
        makerFeeOffchainDelayedOrder: from([fee.makerFeeOffchainDelayedOrder, 18]),
        overrideCommitFee: from([fee.overrideCommitFee, 18]),
      },
      currentFundingRate: divide([m.currentFundingRate, 16], 24), // 1hr Funding Rate
      price: from([m.price, 18]),
      currentFundingVelocity: from([m.currentFundingVelocity, 18]),
      marketDebt: from([m.marketDebt, 18]),
      marketSize: from([m.marketSize, 18]),
      marketSkew: from([m.marketSkew, 18]),
      maxLeverage: from([m.maxLeverage, 18]),
    }
  })
export type MarketSummaries = ReturnType<typeof parseMarketSummaries>

export const marketsQueryKey = (chainId: SupportedChainId) => ['all markets summaries', chainId]
export const fetchMarkets = async ({
  provider,
  chainId,
}: {
  provider: Provider
  chainId: SupportedChainId
}) => {
  const markets = await getContract({
    address: marketData.address[chainId],
    abi: marketData.abi,
    signerOrProvider: provider,
  }).allProxiedMarketSummaries()
  return parseMarketSummaries(markets)
}

// ---------- Market Settings ----------

export const marketSettingsQueryKey = (marketKey?: MarketKey, chainId?: SupportedChainId) => [
  'marketSettings',
  marketKey,
  chainId,
]
export const fetchMarketSettings = async ({
  provider,
  chainId,
  marketKey,
}: {
  provider: Provider
  chainId: number
  marketKey: MarketKey
}) => {
  const settings = getContract({
    address: marketSettings.address[chainId],
    abi: marketSettings.abi,
    signerOrProvider: provider,
  })
  const marketKeyHex = formatBytes32String(marketKey)
  const [skewScale, minInitialMargin, minKeeperFee, maxMarketValue] = await Promise.all([
    settings.skewScale(marketKeyHex),
    settings.minInitialMargin(),
    settings.minKeeperFee(),
    settings.maxMarketValue(marketKeyHex),
    // marketSettings.maxKeeperFee(),
    // marketSettings.liquidationBufferRatio(),
    // marketSettings.liquidationFeeRatio(),
    // marketSettings.liquidationFeeRatio(),
  ])
  const s = valuesToBigInt({ skewScale, minInitialMargin, minKeeperFee, maxMarketValue })
  return {
    skewScale: from([s.skewScale, 18]),
    minInitialMargin: from([s.minInitialMargin, 18]),
    minKeeperFee: from([s.minKeeperFee, 18]),
    maxMarketValue: from([s.maxMarketValue, 18]),
  }
}
export type MarketSettings = Awaited<ReturnType<typeof fetchMarketSettings>>
