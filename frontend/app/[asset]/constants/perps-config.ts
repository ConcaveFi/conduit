import { from } from 'dnum'
import { BigNumber } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'

export const TRACKING_CODE = formatBytes32String('Conduit')

export const calculatePriceImpact = (size: BigNumber, price: BigNumber) => {
    return size.lt(0)
        ? price.mul(995n).div(1000n)
        : price.mul(1005n).div(1000n);
}

export const MAX_LEVERAGE = from(25, 18)
