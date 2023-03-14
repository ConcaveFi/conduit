import { Dnum } from 'dnum'
import { BigNumber } from 'ethers'

export const toBigNumber = (n: Dnum) => BigNumber.from(n[0])
