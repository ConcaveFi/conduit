import {
  useMarketAccessibleMargin,
  useMarketDataAllProxiedMarketSummaries,
  useMarketDelayedOrders,
  useMarketPositions,
  useMarketRemainingMargin,
  useMarketSettingsOffchainDelayedOrderMaxAge,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from '@tradex/contracts'
import { BigNumber } from 'ethers'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils.js'
import { useState } from 'react'
import { useIsMounted } from 'src/hooks/useIsMounted'
import { useDebounce } from 'usehooks-ts'
import { Address } from 'wagmi'
import { format } from '../utils/format'

const Markets = () => {
  const { data: markets } = useMarketDataAllProxiedMarketSummaries()

  const isMounted = useIsMounted()

  if (!markets || !isMounted) return null

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="text-xs text-neutral-400 px-1">Markets</h1>
      <div className="overflow-auto">
        {markets.map(({ market, key, asset, price }) => (
          <a
            key={market}
            href="#"
            className="px-2 py-1 hover:bg-neutral-800 rounded-lg flex justify-between items-center w-40"
          >
            <span className="text-neutral-200 text-sm font-semibold">
              {parseBytes32String(asset)}
            </span>
            <span className="text-neutral-400 text-xs">{format(price.toBigInt(), 18)}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

const Orders = ({
  market,
}: {
  market: { address: Address; key: string; orderMaxAge?: number }
}) => {
  //   const { address } = useAccount()
  const address = '0xbE230D92AD2b2Dc9D75ff16B550533b5D418C4E0'

  const { data: order } = useMarketDelayedOrders({ args: [address], address: market.address })

  const isMounted = useIsMounted()

  if (!order || !isMounted) return null

  const size = order.sizeDelta.toBigInt()
  const side = size > 0 ? 'Long' : 'Short'

  const hasOpenOrder = size !== 0n

  const submittedAt = order.intentionTime.toNumber() * 1000
  const isExpired = market.orderMaxAge
    ? Date.now() > submittedAt + market.orderMaxAge * 1000
    : false

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-neutral-800/40 p-2">
      <div className="px-1">
        <h1 className="text-xs text-neutral-400 mb-0.5">Delayed Order</h1>
        {hasOpenOrder ? (
          <p className="text-xs text-neutral-500">You can have only one order per market</p>
        ) : (
          <span className="text-xs text-neutral-500">No open order</span>
        )}
      </div>
      {hasOpenOrder && (
        <div className="px-2 py-1 hover:bg-neutral-800 rounded-lg flex justify-between items-center">
          <span className="text-neutral-200 text-sm">{market.key}</span>
          {isExpired && (
            <button className="bg-red-400/10 rounded-lg text-xs text-red-400 px-2 py-0.5">
              expired
            </button>
          )}
          <span className="text-neutral-400 text-xs">
            <span className={`mr-3 text-xs ${size > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {side}
            </span>
            {format(size, 18)} ETH
          </span>
        </div>
      )}
    </div>
  )
}

const Position = ({ market }: { market: { address: Address; key: string } }) => {
  //   const { address } = useAccount()
  const address = '0xbE230D92AD2b2Dc9D75ff16B550533b5D418C4E0'

  const { data: position } = useMarketPositions({ args: [address], address: market.address })

  const isMounted = useIsMounted()

  if (!position || !isMounted) return null

  const size = position.size.toBigInt()
  const side = size > 0 ? 'Long' : 'Short'

  const hasPosition = size !== 0n

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="text-xs text-neutral-400 px-1">Position</h1>
      {!hasPosition ? (
        <span className="px-1 text-xs text-neutral-500">No open position</span>
      ) : (
        <div className="px-2 py-1 hover:bg-neutral-800 rounded-lg flex  justify-between items-center">
          <span className="text-neutral-200 text-sm">{market.key}</span>
          <span className={`text-xs ${size > 0 ? 'text-green-400' : 'text-red-400'}`}>{side}</span>
          <span className="text-neutral-400 text-xs">{format(size, 18)} ETH</span>
          {/* <span className="text-neutral-400 text-xs">x{format(position.margin.toBigInt(), 18)}</span> */}
          <span className="text-neutral-400 text-xs">
            {format(position.lastPrice.toBigInt(), 18)}
          </span>
        </div>
      )}
    </div>
  )
}

const TrackingCode = formatBytes32String('tradex')

/** percent in basis points (30 = 0.3%, 100 = 1%, ...) */
export type Percent = bigint | number
const DEFAULT_PRICE_IMPACT_DELTA: Percent = 50 // 0.5%
const bps_divider = 10_000n
export const bpsToWei = (bps: Percent) => (BigInt(bps) * 10n ** 18n) / bps_divider
const OpenPosition = ({ market }: { market: { address: Address; key: string } }) => {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 500)

  const priceImpact = bpsToWei(DEFAULT_PRICE_IMPACT_DELTA)

  const [side, setSide] = useState<'long' | 'short'>('long')
  const size = side === 'long' ? debouncedInput : -debouncedInput

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    args: [BigNumber.from(size), BigNumber.from(priceImpact), TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 rounded-xl bg-neutral-800/40">
      <div className="flex max-w-full">
        <input
          className="font-bold bg-transparent max-w-full w-auto text-3xl placeholder:text-neutral-400 text-neutral-200 outline-none "
          placeholder="0.00"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="flex gap-3 items-center justify-center">
        <button className="px-5 py-1 rounded-full bg-green-600 hover:opacity-80 active:scale-[.99]">
          <span className="text-neutral-200 font-bold">Buy/Long</span>
        </button>
        <button className="px-5 py-1 rounded-full bg-red-600 hover:opacity-80 active:scale-[.99]">
          <span className="text-neutral-200 font-bold">Sell/Short</span>
        </button>
      </div>
    </div>
  )
}

const Margin = ({ market }: { market: { address: Address; key: string } }) => {
  const address = '0xbE230D92AD2b2Dc9D75ff16B550533b5D418C4E0'

  const { data: remainingMargin } = useMarketRemainingMargin({
    args: [address],
    address: market.address,
    select: (d) => d.marginRemaining.toBigInt(),
  })
  const { data: accessibleMargin } = useMarketAccessibleMargin({
    args: [address],
    address: market.address,
    select: (d) => d.marginAccessible.toBigInt(),
  })

  const isMounted = useIsMounted()

  if (!remainingMargin || !accessibleMargin || !isMounted) return null

  return (
    <div className="flex flex-col gap-1 px-3 rounded-xl bg-neutral-800/40 py-2">
      <h1 className="text-xs text-neutral-400">Margin</h1>
      <span className="text-neutral-200 text-xs">Remaining: {format(remainingMargin, 18)}</span>
      <span className="text-neutral-200 text-xs">Accessible: {format(accessibleMargin, 18)}</span>
    </div>
  )
}

const market = {
  address: '0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c',
  key: 'sETH',
} as const

export default function Home() {
  const { data: offchainDelayedOrderMaxAge } = useMarketSettingsOffchainDelayedOrderMaxAge({
    args: [formatBytes32String('sETHPERP')],
  })

  return (
    <div className="bg-neutral-900 w-screen h-screen flex items-center justify-center font-medium">
      <div className="h-[500px] flex gap-2">
        <Markets />
        <div className="w-[300px] h-[500px] flex flex-col gap-2">
          <Orders
            market={{
              ...market,
              orderMaxAge: offchainDelayedOrderMaxAge?.toNumber(),
            }}
          />
          <Position market={market} />
          <Margin market={market} />
          {/* <OpenPosition /> */}
        </div>
      </div>
    </div>
  )
}

/*
https://subgraph.satsuma-prod.com/05943208e921/kwenta/optimism-perps/api
https://api.thegraph.com/subgraphs/name/kwenta/optimism-goerli-main
query {
  futuresTrades (where: { account: "0xbE230D92AD2b2Dc9D75ff16B550533b5D418C4E0" }) {
    asset
    orderType
    positionSize
    positionClosed
    size
    timestamp
  }
}
*/
