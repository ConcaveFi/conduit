import { Address } from 'abitype'
import { gql } from 'graphql-request'

export type LeaderboardQueryStats = {
  account: Address
  pnl: string
  pnlWithFeesPaid: string
  liquidations: string
  totalTrades: string
  totalVolume: string
}
export type LeaderboardQuery = {
  top: LeaderboardQueryStats[]
  bottom: LeaderboardQueryStats[]
}

export const LEADERBOARD_QUERY = gql`
  query leaderboardStats {
    top: futuresStats(orderBy: pnlWithFeesPaid, orderDirection: desc, first: 100) {
      account
      pnl
      pnlWithFeesPaid
      liquidations
      totalTrades
      totalVolume
    }
    bottom: futuresStats(orderBy: pnlWithFeesPaid, orderDirection: asc, first: 100) {
      account
      pnl
      pnlWithFeesPaid
      liquidations
      totalTrades
      totalVolume
    }
  }
`
