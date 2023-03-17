import request from 'graphql-request'
import 'server-only'
import { LEADERBOARD_QUERY, LeaderboardQuery } from './constants/queries'

export async function getLeaderboardPlaces() {
  const response: LeaderboardQuery = await request(
    'https://conduit.hasura.app/v1/graphql',
    LEADERBOARD_QUERY,
  )

  return response
}
