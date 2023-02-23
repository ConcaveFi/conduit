import { useConnectModal } from '@rainbow-me/rainbowkit'
import { cx, NumericInput } from '@tradex/interface'
import { BigNumber, BigNumberish } from 'ethers'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils.js'
import { useRouter } from 'next/router'
import {
  useMarketAccessibleMargin,
  useMarketDataAllProxiedMarketSummaries,
  useMarketDelayedOrders,
  useMarketPositions,
  useMarketRemainingMargin,
  useMarketSettingsOffchainDelayedOrderMaxAge,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  useMarketTransferMargin,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketTransferMargin,
} from 'perps-hooks'
import { useState } from 'react'
import { useIsMounted } from 'src/hooks/useIsMounted'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import { format } from '../utils/format'

const useRouteMarket = () => {
  const router = useRouter()
  const { data: markets } = useMarketDataAllProxiedMarketSummaries({
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const asset = router.query.asset
  if (markets?.length && router.isReady && !asset) router.replace(`/perps?asset=sETH`)

  return markets?.find((m) => parseBytes32String(m.asset) === asset)
}

const Markets = () => {
  const { data: markets } = useMarketDataAllProxiedMarketSummaries({
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const isMounted = useIsMounted()

  const router = useRouter()
  const routeMarket = useRouteMarket()

  if (!markets || !isMounted) return null

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="text-xs text-neutral-400 px-1">Markets</h1>
      <div className="overflow-y-auto overflow-x-hidden">
        {markets.map(({ market, key, asset, price }) => (
          <a
            key={market}
            onClick={() => {
              router.replace(`?asset=${parseBytes32String(asset)}`, undefined, { shallow: true })
            }}
            data-selected={routeMarket?.market === market}
            className="px-2 py-1 hover:bg-neutral-800 rounded-lg flex justify-between items-center w-40 data-[selected=true]:bg-neutral-800"
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

const Orders = () => {
  const market = useRouteMarket()

  const { data: offchainDelayedOrderMaxAge } = useMarketSettingsOffchainDelayedOrderMaxAge({
    args: market && [market.key],
    enabled: !!market,
    select: (v) => v.toNumber(),
  })

  const { address } = useAccount()

  const { data: order } = useMarketDelayedOrders({
    args: address && [address],
    address: market?.market,
  })

  const isMounted = useIsMounted()

  if (!market || !order || !isMounted) return null

  const size = order.sizeDelta.toBigInt()
  const side = size > 0 ? 'Long' : 'Short'

  const hasOpenOrder = size !== 0n

  const submittedAt = order.intentionTime.toNumber() * 1000
  const isExpired = offchainDelayedOrderMaxAge
    ? Date.now() > submittedAt + offchainDelayedOrderMaxAge * 1000
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

const Position = () => {
  const { address } = useAccount()
  const market = useRouteMarket()

  const { data: position } = useMarketPositions({
    args: address && [address],
    address: market && market.market,
    enabled: !!market?.market,
  })

  const isMounted = useIsMounted()

  if (!market || !position || !isMounted) return null

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

const n = (v: BigNumberish) => BigNumber.from(v || 0)

const OpenPosition = () => {
  const market = useRouteMarket()

  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 500)

  const priceImpact = bpsToWei(DEFAULT_PRICE_IMPACT_DELTA)

  const [side, setSide] = useState<'long' | 'short'>('long')
  const size = side === 'long' ? debouncedInput : -debouncedInput

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market && market.market,
    args: [n(size), n(priceImpact), TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 rounded-xl bg-neutral-800/40">
      <div className="flex max-w-full">
        <NumericInput
          className="font-bold bg-transparent max-w-full w-auto text-3xl placeholder:text-neutral-400 text-neutral-200 outline-none "
          placeholder="0.00"
          value={input}
          onValueChange={({ value }) => setInput(value)}
        />
      </div>
      <div className="flex gap-3 items-center justify-center">
        <button
          className={cx(
            side === 'long' ? 'outline outline-green-700' : '',
            'px-5 py-1 rounded-full bg-green-600/20 hover:opacity-80 active:scale-[.99] outline-1 outline-offset-2',
          )}
          onClick={() => setSide('long')}
        >
          <span className="text-neutral-200 font-bold">Buy/Long</span>
        </button>
        <button
          className={cx(
            side === 'short' ? 'outline outline-red-700' : '',
            'px-5 py-1 rounded-full bg-red-600/20 hover:opacity-80 active:scale-[.99] outline-1 outline-offset-2',
          )}
          onClick={() => setSide('short')}
        >
          <span className="text-neutral-200 font-bold">Sell/Short</span>
        </button>
      </div>
    </div>
  )
}

const DepositMargin = () => {
  const market = useRouteMarket()

  const { config } = usePrepareMarketTransferMargin({
    address: market && market.market,
    enabled: !!market?.market,
    args: [BigNumber.from(100)],
  })
  const { write } = useMarketTransferMargin(config)
  return (
    <button
      className="px-4 py-1.5 rounded-full bg-neutral-800 mt-3 font-bold text-white text-sm hover:opacity-75 disabled:text-neutral-600"
      disabled={!!write}
      onClick={() => write?.()}
    >
      Deposit margin
    </button>
  )
}

const Margin = () => {
  const { address } = useAccount()

  const market = useRouteMarket()

  const { data: accessibleMargin } = useMarketAccessibleMargin({
    address: market && market.market,
    args: address && [address],
    select: (d) => d.marginAccessible.toBigInt(),
  })
  const { data: remainingMargin } = useMarketRemainingMargin({
    address: market && market.market,
    args: address && [address],
    select: (d) => d.marginRemaining.toBigInt(),
  })

  const isMounted = useIsMounted()

  if (!accessibleMargin || !remainingMargin || !market || !isMounted) return null

  const maxLeverage = market.maxLeverage.toBigInt()
  const buyingPower = format(remainingMargin * maxLeverage, 18 * 2)

  const marginUsed = accessibleMargin - remainingMargin

  return (
    <div className="flex flex-col gap-1 px-3 rounded-xl bg-neutral-800/40 py-2">
      <h1 className="text-xs text-neutral-400">Margin</h1>
      <span className="text-neutral-200 text-xs">
        Available margin: {format(remainingMargin, 18)}
      </span>
      <div className="flex gap-1">
        <span className="text-neutral-200 text-xs">Buying power: {buyingPower}</span>
        <span className="text-neutral-400 text-xs">x{format(maxLeverage, 18)}</span>
      </div>
      <span className="text-neutral-200 text-xs">Margin used: {marginUsed.toString()}</span>
      <DepositMargin />
    </div>
  )
}

const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const isMounted = useIsMounted()
  if (isConnected || !isMounted) return null
  return (
    <button
      className="px-4 py-1.5 rounded-full bg-neutral-100 mt-3 font-bold text-neutral-900 text-sm hover:opacity-75"
      onClick={openConnectModal}
    >
      Connect Wallet
    </button>
  )
}

export default function Home() {
  return (
    <div className="bg-neutral-900 w-screen h-screen flex items-center justify-center font-medium">
      <div className="h-[500px] flex gap-2">
        <Markets />
        <div className="w-[300px] h-[500px] flex flex-col gap-2">
          <ConnectWallet />
          <Orders />
          <Position />
          <Margin />
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

orchard depart inflict heart inhale velvet twelve cover cute hybrid weird flat

*/
