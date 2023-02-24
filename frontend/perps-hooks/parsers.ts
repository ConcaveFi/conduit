import { ReadContractResult } from '@wagmi/core'
import { BigNumber, FixedNumber } from 'ethers'
import { parseBytes32String } from 'ethers/lib/utils.js'
import { marketABI, marketDataABI } from 'perps-hooks'

const valuesToFixedNumber = <T extends Record<string, BigNumber>>(obj: T) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      // ethers contract result is an arraylike obj, so to filter out the array part we ignore number keys
      isNaN(+key) ? { ...acc, [key]: FixedNumber.fromValue(value, 18) } : acc,
    {} as Record<keyof T, FixedNumber>,
  )

type MarketSummariesResult = ReadContractResult<typeof marketDataABI, 'allProxiedMarketSummaries'>

export const parseMarketSummaries = (summaries: MarketSummariesResult) =>
  summaries.map(({ market, key, asset, feeRates, ...summary }) => ({
    market,
    address: market,
    key: parseBytes32String(key),
    asset: parseBytes32String(asset),
    feeRates: valuesToFixedNumber(feeRates),
    ...valuesToFixedNumber(summary),
  }))
export type MarketSummaries = ReturnType<typeof parseMarketSummaries>

type OrderResult = ReadContractResult<typeof marketABI, 'delayedOrders'>

export const parseOrder = ({
  executableAtTime,
  intentionTime,
  isOffchain,
  trackingCode,
  targetRoundId,
  ...o
}: OrderResult) => ({
  executableAtTime: intentionTime.toNumber(),
  intentionTime: intentionTime.toNumber(),
  isOffchain,
  trackingCode: parseBytes32String(trackingCode),
  targetRoundId,
  ...valuesToFixedNumber(o),
})
export type Order = ReturnType<typeof parseOrder>

type PositionResult = ReadContractResult<typeof marketABI, 'positions'>

export const parsePosition = ({ id, lastFundingIndex, ...p }: PositionResult) => ({
  id,
  lastFundingIndex,
  ...valuesToFixedNumber(p),
})
export type Position = ReturnType<typeof parsePosition>
