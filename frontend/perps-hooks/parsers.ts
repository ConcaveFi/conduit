import { ReadContractResult } from '@wagmi/core'
import { parseBytes32String } from 'ethers/lib/utils.js'
import { marketABI, marketDataABI } from 'perps-hooks'

import { from } from 'dnum'
import { BigNumber } from 'ethers'

export const valuesToBigInt = <T extends Record<string, BigNumber>>(obj: T) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      // ethers contract result is an arraylike obj, so to filter out the array part we ignore number keys
      isNaN(+key) ? { ...acc, [key]: value.toBigInt() } : acc,
    {} as Record<keyof T, bigint>,
  )

type OrderResult = ReadContractResult<typeof marketABI, 'delayedOrders'>
export const parseOrder = ({ isOffchain, trackingCode, ...order }: OrderResult) => {
  const o = valuesToBigInt(order)
  return {
    executableAtTime: o.executableAtTime,
    intentionTime: o.intentionTime,
    isOffchain: isOffchain,
    trackingCode: parseBytes32String(trackingCode),
    targetRoundId: o.targetRoundId,
    commitDeposit: from([o.commitDeposit, 18]),
    keeperDeposit: from([o.keeperDeposit, 18]),
    priceImpactDelta: from([o.priceImpactDelta, 18]),
    sizeDelta: from([o.sizeDelta, 18]),
  }
}
export type Order = ReturnType<typeof parseOrder>

type PositionResult = ReadContractResult<typeof marketABI, 'positions'>

export const parsePosition = (position: PositionResult) => {
  const p = valuesToBigInt(position)
  return {
    id: p.id,
    lastFundingIndex: p.lastFundingIndex,
    lastPrice: from([p.lastPrice, 18]),
    margin: from([p.margin, 18]),
    size: from([p.size, 18]),
  }
}
export type Position = ReturnType<typeof parsePosition>

type PositionDetailsResult = ReadContractResult<typeof marketDataABI, 'positionDetails'>

export const parsePositionDetails = ({
  position,
  canLiquidatePosition,
  ...details
}: PositionDetailsResult) => {
  const d = valuesToBigInt(details)
  return {
    position: parsePosition(position),
    canLiquidatePosition: canLiquidatePosition,
    accessibleMargin: from([d.accessibleMargin, 18]),
    remainingMargin: from([d.remainingMargin, 18]),
    accruedFunding: from([d.accruedFunding, 18]),
    liquidationPrice: from([d.liquidationPrice, 18]),
    notionalValue: from([d.notionalValue, 18]),
    profitLoss: from([d.profitLoss, 18]),
  }
}
export type PositionDetails = ReturnType<typeof parsePositionDetails>
