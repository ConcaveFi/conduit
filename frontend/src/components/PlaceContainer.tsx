import { ReactNode, useMemo, useState } from 'react'
import { ArrowCircle } from './icons/ArrowCricle'
import { MarketSelector } from './MarketSelector'
import { PlaceOrder, TypeChooser } from './TypeChooser'
import { WalletBalance } from './WalletBalance'

export function PlaceContainer() {
  const defaultOrder = 'buy'
  const [activeType, setActiveType] = useState<PlaceOrder>(defaultOrder)
  return (
    <div className="w-[20%] bg-dark-900 border-l border-dark-700 flex flex-col justify-center">
      <TopbarInfo />

      <div className="flex flex-col flex-1 justify-center">
        <div className="flex h-fit flex-col p-6 gap-4">
          <MarketSelector />
          <TypeChooser onTypeChange={setActiveType} defaultType={defaultOrder} />
          <PlaceInput max currency="BTC">
            Amount
          </PlaceInput>
          <PlaceInput currency="USD">Limit Price</PlaceInput>
          <button
            className={`w-full h-14 font-bold
              ${
                activeType === 'buy'
                  ? 'bg-green-gradient text-green-100'
                  : 'bg-red-gradient text-red-100'
              }
              rounded-md font-mont text-sm `}
          >
            Place {activeType} order
          </button>
        </div>
        <div className="w-full min-h-[50px] border-y border-dark-700 flex items-end p-2">
          <span className="text-gray-300  uppercase text-xs font-semibold">Wallet balance</span>
        </div>
        <div className="flex h-fit flex-col p-4 gap-4">
          <WalletBalance />
          <div className="flex justify-between gap-4">
            <button className="h-14 items-center justify-center flex gap-2 flex-1 bg-dark-700 text-gray-100 font-mont uppercase text-sm font-semibold border border-dark-700 rounded-md">
              <ArrowCircle />
              Deposit
            </button>
            <button className="h-14 items-center justify-center flex gap-2 flex-1 bg-dark-700 text-gray-100 font-mont uppercase text-sm font-semibold border border-dark-700 rounded-md">
              <ArrowCircle direction="up" />
              WithDraw
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlaceInputProps {
  currency: string
  children?: ReactNode
  max?: boolean
}
function PlaceInput(props: PlaceInputProps) {
  return (
    <div className="flex flex-col gap-1 ">
      <span className="text-gray-400 font-bold font-mont text-xs uppercase">{props.children}</span>
      <div className="flex overflow-hidden justify-between gap-4 items-center rounded-md  text-gray-200 font-urbanist font-semibold  h-[58px] bg-dark-700">
        <div className="flex w-4/5">
          {props.max && (
            <button className="ml-3 text-gray-500 uppercase font-mont font-bold text-xs underline">
              max
            </button>
          )}
          <input
            className="outline-none bg-transparent text-end flex-1 "
            type="text"
            placeholder="0.00"
          />
        </div>
        <div className="h-full border- bg-gray-700 items-center justify-center font-mont uppercase text-[14px] text-gray-400 flex w-1/5">
          {props?.currency}{' '}
        </div>
      </div>
    </div>
  )
}

function TopbarInfo() {
  return (
    <div className="w-full min-h-[50px] border-b border-dark-700 flex items-end p-2">
      <span className="text-gray-300  uppercase text-xs font-semibold">Order</span>
    </div>
  )
}
