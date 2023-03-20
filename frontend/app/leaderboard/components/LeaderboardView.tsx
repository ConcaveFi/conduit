'use client'

import { ChevronIcon, SearchIcon } from '@tradex/icons'
import { cx } from '@tradex/interface'
import * as dn from 'dnum'
import { useMemo, useState } from 'react'
import { truncateAddress } from 'utils/truncateAddress'
import { LeaderboardQuery } from '../constants/queries'
import { LeaderboardStats, mapPlaces } from '../lib/formatQueryResponse'

export function LeaderboardView({ places }: { places: LeaderboardQuery }) {
  const [sort, setSort] = useState<'top' | 'bottom'>('top')
  const [pagination, setPagination] = useState(1)

  const totalPages = useMemo(() => places[sort].length / 10, [sort])
  const placesRow = useMemo(() => {
    const directionArray = mapPlaces(places[sort].slice(0 + (pagination - 1) * 10, 10 * pagination))
    return directionArray.map((place, index) => {
      const rankStart = (pagination - 1) * 10
      return <LeaderboardRow key={place.account} place={place} rank={rankStart + ++index} />
    })
  }, [pagination, places, sort])

  function handlePagination(newPag: number) {
    if (newPag <= 1) newPag = 1
    if (newPag >= totalPages) newPag = totalPages
    setPagination(newPag)
  }

  return (
    <div className="mx-auto mt-8 flex w-[840px] flex-col">
      <div className="flex w-full justify-between">
        {/* Sorter */}
        <button
          onClick={() => setSort((prev) => (prev === 'bottom' ? 'top' : 'bottom'))}
          className="centered text-dark-accent ocean:text-blue-accent flex gap-2 text-xs"
        >
          Sort: {sort === 'top' ? `Top to bottom` : 'Bottom to top'}
          <ChevronIcon
            className={cx(
              'fill-dark-30 ocean:fill-blue-30 box-3 transition-all',
              sort === 'bottom' ? 'rotate-180' : '',
            )}
          />
        </button>

        {/*  Search input */}
        <div className="centered bg-dark-10 ocean:bg-blue-10 flex h-[40px] w-[190px] gap-1 rounded-full px-4 shadow-md">
          <SearchIcon className="stroke-dark-30 ocean:stroke-blue-30 box-6" />
          <input
            type="text"
            className="text-ocean-200 placeholder:text-dark-30 ocean:placeholder:text-blue-30 w-full bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Card */}
      <span className="text-dark-accent ocean:text-blue-accent mx-auto mt-2 mb-2 text-xs font-medium">
        Top Traders
      </span>
      <div className=" border-dark-30 ocean:border-blue-30 rounded-lg border">
        <table className=" w-full  overflow-hidden rounded-lg ">
          {TableHeader}
          <tbody>{placesRow}</tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-4 flex justify-between px-4">
        <div className="flex gap-2">
          {/* <BorderArrow className="box-4 rotate-180" /> */}
          <button onClick={() => handlePagination(pagination - 1)}>
            <ChevronIcon className="box-4 fill-dark-30 ocean:fill-blue-30 rotate-90" />{' '}
          </button>
        </div>
        <span className="text-dark-30 ocean:text-blue-30 text-xs">
          page {pagination} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button onClick={() => handlePagination(pagination + 1)}>
            <ChevronIcon className="box-4 fill-dark-30 ocean:fill-blue-30 -rotate-90" />
          </button>
          {/*  <BorderArrow className="box-4 " /> */}
        </div>
      </div>
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
