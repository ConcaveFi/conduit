import { BitcoinIcon } from './icons/BitcoinIcon'
import { ChevronIcon } from './icons/ChevronIcon'

export function MarketSelector() {
  return (
    <div className="w-full mx-auto h-20 rounded-md p-4 border border-dark-700 bg-dark justify-center flex flex-col">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <BitcoinIcon className="fill-orange-200" />
          <div className="flex flex-col">
            <span className="font-mont text-gray-300 font-bold">BTC - USD</span>
            <span className="font-nunito text-gray-400 font-bold text-sm">$17,200.00</span>
          </div>
        </div>
        <button className="flex items-center gap-1 hover:underline text-gray-300 font-semibold font-urbanist">
          select market
          <ChevronIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
