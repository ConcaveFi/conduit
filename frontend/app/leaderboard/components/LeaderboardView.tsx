'use client'

import { ChevronIcon } from '@tradex/icons'
import { cx } from '@tradex/interface'
import { useMemo, useState } from 'react'
import { LeaderboardQuery } from '../constants/queries'
import { LeaderboardTable } from './LeaderboardTable'
import { SearchAddress } from './SearchAddress'

export function LeaderboardView({ places }: { places: LeaderboardQuery }) {
  const [direction, setSort] = useState<'top' | 'bottom'>('top')
  const [pagination, setPagination] = useState(1)
  const totalPages = useMemo(() => places[direction].length / 10, [direction, places])
  const [search, setSearch] = useState('')

  function handlePagination(newPag: number) {
    if (newPag <= 1) newPag = 1
    if (newPag >= totalPages) newPag = totalPages
    setPagination(newPag)
  }

  return (
    <div className="mx-auto mt-8 flex w-[840px] flex-col">
      <div className="flex w-full justify-between px-4">
        <DirectionSortButton onToggle={setSort} direction={direction} />
        <SearchAddress onSubmit={setSearch} />
      </div>
      {/* Card */}
      <span className="text-dark-accent ocean:text-blue-accent mx-auto mt-2 mb-2 text-xs font-medium">
        Top Traders
      </span>
      <LeaderboardTable
        search={search}
        pagination={pagination}
        direction={direction}
        places={places}
      />

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

type DirectionSort = 'bottom' | 'top'
type DirectionSortButtonProps = { direction: DirectionSort; onToggle(sort: DirectionSort) }
const DirectionSortButton = (props: DirectionSortButtonProps) => {
  return (
    <button
      onClick={() => props.onToggle(props.direction === 'bottom' ? 'top' : 'bottom')}
      className="centered text-dark-accent ocean:text-blue-accent flex gap-2 text-xs"
    >
      Sort: {props.direction === 'top' ? `Top to bottom` : 'Bottom to top'}
      <ChevronIcon
        className={cx(
          'fill-dark-30 ocean:fill-blue-30 box-3 transition-all',
          props.direction === 'bottom' ? 'rotate-180' : '',
        )}
      />
    </button>
  )
}
