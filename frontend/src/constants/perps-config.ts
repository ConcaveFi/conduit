/*

position leverage

skewScale

maxMarketValue
marketLimit: wei(marketParameters[i].maxMarketValue).mul(wei(price)),

minInitialMargin: wei(globals.minInitialMargin),
keeperDeposit: wei(globals.minKeeperFee),

isSuspended: suspensions[i],

openInterest

currentRoundId

currentFundingRate: wei(currentFundingRate).div(24),

marketClosureReason: getReasonFromCode(reasons[i]) as MarketClosureReason,

*/

import { BigNumber, FixedNumber } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'

export const TrackingCode = formatBytes32String('Conduit')

export const DEFAULT_PRICE_IMPACT_DELTA = BigNumber.from('500000000000000000') // 0.5%

export const MAX_LEVERAGE = FixedNumber.from(25)
