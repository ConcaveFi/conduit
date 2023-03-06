import { ReadContractResult } from '@wagmi/core'
import { BigNumber, FixedNumber } from 'ethers'
import { parseBytes32String } from 'ethers/lib/utils.js'
import { marketABI, marketDataABI } from 'perps-hooks'

export const valuesToFixedNumber = <T extends Record<string, BigNumber>>(obj: T) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      // ethers contract result is an arraylike obj, so to filter out the array part we ignore number keys
      isNaN(+key) ? { ...acc, [key]: FixedNumber.fromValue(value, 18) } : acc,
    {} as Record<keyof T, FixedNumber>,
  )

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

type PositionDetailsResult = ReadContractResult<typeof marketDataABI, 'positionDetails'>

export const parsePositionDetails = ({
  position,
  canLiquidatePosition,
  ...p
}: PositionDetailsResult) => ({
  position: parsePosition(position),
  canLiquidatePosition,
  ...valuesToFixedNumber(p),
})
export type PositionDetails = ReturnType<typeof parsePositionDetails>
