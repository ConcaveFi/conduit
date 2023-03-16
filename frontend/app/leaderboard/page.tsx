import { ChevronIcon } from '@tradex/icons'

export default async function Page({ params }) {
  return (
    <div className="mx-auto mt-8 flex w-[840px] flex-col">
      <div className="flex w-full justify-between">
        {/* Sorter */}
        <span className="centered text-ocean-200 flex gap-2 text-xs">
          Sort: Top to bottom <ChevronIcon className="fill-ocean-200V box-3" />
        </span>

        {/*  Search input */}
        <div className="centered bg-Blue/main-block flex h-[40px] w-[190px] gap-1 rounded-full px-4">
          {/* <SearchIcon className="stroke-ocean-300 box-6" /> */}
          <input
            type="text"
            className="text-ocean-200 placeholder:text-ocean-300 w-full bg-transparent"
            placeholder="Search"
          />
        </div>
      </div>

      <span className="text-ocean-200 mx-auto mt-2 mb-2 text-xs font-medium">Top Traders</span>
      <div className="border-Blue/main-block rounded-lg border">
        <table className="bg-ocean-700 w-full  overflow-hidden rounded-lg ">
          <thead className=" ">
            <tr className="text-ocean-200  h-[34px] bg-[#0B1640] text-xs font-medium ">
              <td className="pl-5 ">Rank</td>
              <td>Trader</td>
              <td>Total Trades</td>
              <td>Liquidations</td>
              <td>Total Value</td>
              <td>P&L</td>
            </tr>
          </thead>
          <tbody>
            {new Array(3).fill(0).map((_, i) => (
              <tr
                key={i}
                className="text-bright-text   even:bg-ocean-900 h-[52px] text-sm font-medium"
              >
                <td className="pl-5 ">{++i}</td>
                <td>0xe8c...0c9cd</td>
                <td>13</td>
                <td>1</td>
                <td>$32.987</td>
                <td>$518,458.29</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4 flex justify-between px-4">
        <div className="flex gap-2">
          {/* <BorderArrow className="box-4 rotate-180" />
           */}
          <ChevronIcon className="box-4 fill-ocean-300 rotate-90" />{' '}
        </div>
        <span className="text-ocean-200 text-xs">Page 4 0f 10</span>
        <div className="flex gap-2">
          <ChevronIcon className="box-4 fill-ocean-300 -rotate-90" />
          {/*  <BorderArrow className="box-4 " /> */}
        </div>
      </div>
    </div>
  )
}
