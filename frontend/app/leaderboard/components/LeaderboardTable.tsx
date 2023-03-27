import { TriangleIcon } from '@tradex/icons'
import { cx } from '@tradex/interface'
import * as dn from 'dnum'
import { useMemo, useState } from 'react'
import { truncateAddress } from 'utils/truncateAddress'
import { LeaderboardQuery } from '../constants/queries'
import { LeaderboardStats, mapPlaces } from '../lib/formatQueryResponse'

type LeaderboardSortOrder = 'ASC' | 'DESC'
type LeaderboardSortValues = 'P&L' | 'Total Value' | 'Total Trades' | 'None'
type LeaderboardSort = { sort: LeaderboardSortValues; order: LeaderboardSortOrder }
interface LeaderboardTable {
  places: LeaderboardQuery
  direction: 'bottom' | 'top'
  pagination: number
  search: string
}
export function LeaderboardTable({ places, direction, pagination, search }: LeaderboardTable) {
  const [sort, setSort] = useState<LeaderboardSort>({ sort: 'None', order: 'ASC' })
  const placesRow = useMemo(() => {
    let directionArray = mapPlaces(
      places[direction].slice(0 + (pagination - 1) * 10, 10 * pagination),
    )
    if (search) directionArray = directionArray.filter((place) => place.account.includes(search))
    return directionArray.sort(sortNOrderSorter(sort)).map((place, index) => {
      const rankStart = (pagination - 1) * 10
      return <LeaderboardRow key={place.account} place={place} rank={rankStart + ++index} />
    })
  }, [pagination, places, direction, search, sort])

  return (
    <div className=" border-dark-30 ocean:border-blue-30 rounded-lg border">
      <table className=" w-full  overflow-hidden rounded-lg ">
        <thead className=" ">
          <tr className="text-dark-accent ocean:text-blue-accent bg-dark-20 ocean:bg-blue-20 h-[34px] text-xs font-medium ">
            <td className="pl-5 ">Rank</td>
            <td>Trader</td>
            <TableDataSortButton
              title="Total Trades"
              currentSort={sort}
              onChange={setSort}
              sort="Total Trades"
            />
            <td>Liquidations</td>
            <TableDataSortButton
              title="Total Value"
              currentSort={sort}
              onChange={setSort}
              sort="Total Value"
            />
            <TableDataSortButton title="P&L" currentSort={sort} onChange={setSort} sort="P&L" />
          </tr>
        </thead>
        <tbody>{placesRow}</tbody>
      </table>
    </div>
  )
}
type TableDataSortButtonProps = {
  currentSort: LeaderboardSort
  onChange(sort: LeaderboardSort): void
  sort: LeaderboardSortValues
  title: string
}
function TableDataSortButton(props: TableDataSortButtonProps) {
  const { order, sort: currentSort } = props.currentSort
  const { sort } = props

  const isSelected = currentSort === props.sort
  const isAscSelected = isSelected && order === 'ASC'
  const isDescSelected = isSelected && order === 'DESC'
  const arrowBaseStyles =
    'fill-dark-30 aria-selected:fill-dark-accent ocean:fill-blue-30 ocean:aria-selected:fill-blue-30 box-2.5'

  function handleClick() {
    if (!isSelected) props.onChange({ sort, order: 'ASC' })
    else if (isSelected && order === 'ASC') props.onChange({ sort, order: 'DESC' })
    else props.onChange({ sort: 'None', order: 'ASC' })
  }

  return (
    <td>
      <button className="centered flex gap-1" onClick={handleClick}>
        {props.title}
        <div className="centered flex  flex-col">
          <TriangleIcon
            aria-selected={isAscSelected}
            className={cx(arrowBaseStyles, '-mb-0.5 rotate-90')}
          />
          <TriangleIcon
            aria-selected={isDescSelected}
            className={cx(arrowBaseStyles, '-rotate-90')}
          />
        </div>
      </button>
    </td>
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

function sortNOrderSorter(sort: LeaderboardSort) {
  const handleFunctions = {
    'P&L': {
      ASC: (cur: LeaderboardStats, prev: LeaderboardStats) =>
        dn.greaterThan(cur.pnl, prev.pnl) ? -1 : 1,
      DESC: (cur: LeaderboardStats, prev: LeaderboardStats) =>
        dn.greaterThan(cur.pnl, prev.pnl) ? 1 : -1,
    },
    'Total Trades': {
      ASC: (cur: LeaderboardStats, prev: LeaderboardStats) =>
        cur.totalTrades > prev.totalTrades ? -1 : 1,
      DESC: (cur: LeaderboardStats, prev: LeaderboardStats) =>
        cur.totalTrades > prev.totalTrades ? 1 : -1,
    },
    'Total Value': {
      ASC: (cur: LeaderboardStats, prev: LeaderboardStats) =>
        dn.greaterThan(cur.totalVolume, prev.totalVolume) ? -1 : 1,
      DESC: (cur: LeaderboardStats, prev: LeaderboardStats) =>
        dn.greaterThan(cur.totalVolume, prev.totalVolume) ? 1 : -1,
    },
    None: {
      ASC: () => 0,
      DESC: () => 0,
    },
  }

  return handleFunctions[sort.sort][sort.order]
}
