import { cx } from '@tradex/interface'
import * as dn from 'dnum'
import { useMemo } from 'react'
import { truncateAddress } from 'utils/truncateAddress'
import { LeaderboardQuery } from '../constants/queries'
import { LeaderboardStats, mapPlaces } from '../lib/formatQueryResponse'

interface LeaderboardTable {
  places: LeaderboardQuery
  sort: 'bottom' | 'top'
  pagination: number
  search: string
}
export function LeaderboardTable({ places, sort, pagination, search }: LeaderboardTable) {
  const placesRow = useMemo(() => {
    let directionArray = mapPlaces(places[sort].slice(0 + (pagination - 1) * 10, 10 * pagination))
    if (search) directionArray = directionArray.filter((place) => place.account.includes(search))
    return directionArray.map((place, index) => {
      const rankStart = (pagination - 1) * 10
      return <LeaderboardRow key={place.account} place={place} rank={rankStart + ++index} />
    })
  }, [pagination, places, sort, search])

  return (
    <div className=" border-dark-30 ocean:border-blue-30 rounded-lg border">
      <table className=" w-full  overflow-hidden rounded-lg ">
        {TableHeader}
        <tbody>{placesRow}</tbody>
      </table>
    </div>
  )
}

function LeaderboardRow({ place, rank }: { place: LeaderboardStats; rank: number }) {
  return (
    <tr
      key={place.account}
      className="even:bg-dark-10 ocean:even:bg-blue-10 h-[52px] text-sm font-medium text-white"
    >
      <td className="pl-5 ">{rank}</td>
      <td>{truncateAddress(place.account)}</td>
      <td>{place.totalTrades}</td>
      <td>{place.liquidations}</td>
      <td>{dn.format(place.totalVolume, { digits: 2 })}</td>
      <td className={cx(dn.lessThan(place.pnl, dn.from(0)) ? 'text-negative' : 'text-positive')}>
        {dn.format(place.pnl, { digits: 2 })}
      </td>
    </tr>
  )
}

const TableHeader = (
  <thead className=" ">
    <tr className="text-dark-accent ocean:text-blue-accent bg-dark-20 ocean:bg-blue-20 h-[34px] text-xs font-medium ">
      <td className="pl-5 ">Rank</td>
      <td>Trader</td>
      <td>Total Trades</td>
      <td>Liquidations</td>
      <td>Total Value</td>
      <td>P&L</td>
    </tr>
  </thead>
)
