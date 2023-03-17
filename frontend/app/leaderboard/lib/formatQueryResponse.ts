import { Address } from 'abitype'
import * as dn from 'dnum'
import { LeaderboardQueryStats } from '../constants/queries'

export function mapPlaces(places: LeaderboardQueryStats[]) {
  return places.map((place) => {
    return {
      ...place,
      liquidations: Number(place.liquidations),
      pnl: dn.from([BigInt(place.pnl), 18]),
      totalTrades: Number(place.totalTrades),
      totalVolume: dn.from([BigInt(place.totalVolume), 18]),
      pnlWithFeesPaid: dn.from(BigInt(place.pnlWithFeesPaid), 18),
    } as LeaderboardStats
  })
}

export type LeaderboardStats = {
  account: Address
  liquidations: number
  totalTrades: number
  pnl: dn.Dnum
  totalVolume: dn.Dnum
  pnlWithFeesPaid: dn.Dnum
}
