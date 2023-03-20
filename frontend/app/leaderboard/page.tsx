import { LeaderboardView } from './components/LeaderboardView'
import { getLeaderboardPlaces } from './server-only'

export default async function Page({ params }) {
  const leaderboard = await getLeaderboardPlaces()
  return <LeaderboardView places={leaderboard} />
}
