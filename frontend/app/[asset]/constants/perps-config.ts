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

if (positionHistory && tradePreview) {
    const { avgEntryPrice, side, size } = positionHistory;
    const currentSize = side === PositionSide.SHORT ? size.neg() : size;

    // If the trade switched sides (long -> short or short -> long), use oracle price
    if (currentSize.mul(tradePreview.size).lt(0)) return tradePreview.price;

    // If the trade reduced position size on the same side, average entry remains the same
    if (tradePreview.size.abs().lt(size)) return avgEntryPrice;

    // If the trade increased position size on the same side, calculate new average
    const existingValue = avgEntryPrice.mul(size);
    const newValue = tradePreview.price.mul(tradePreview.sizeDelta.abs());
    const totalValue = existingValue.add(newValue);
    return totalValue.div(tradePreview.size.abs());
}

*/

import { from } from 'dnum'
import { formatBytes32String } from 'ethers/lib/utils'

export const TRACKING_CODE = formatBytes32String('Conduit')

export const DEFAULT_PRICE_IMPACT_DELTA = from(0.5, 18)

export const MAX_LEVERAGE = from(25, 18)
