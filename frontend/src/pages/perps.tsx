import { useConnectModal } from '@rainbow-me/rainbowkit'
import { cx, NumericInput } from '@tradex/interface'
import { BigNumber, FixedNumber } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils.js'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useChainLinkLatestRoundData,
  useMarketAccessibleMargin,
  useMarketDataAllProxiedMarketSummaries,
  useMarketDataPositionDetails,
  useMarketDelayedOrders,
  useMarketPostTradeDetails,
  useMarketRemainingMargin,
  useMarketSettingsOffchainDelayedOrderMaxAge,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  useMarketTransferMargin,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketTransferMargin,
} from 'perps-hooks'
import { parseMarketSummaries, parseOrder, parsePositionDetails } from 'perps-hooks/parsers'
import { useMemo, useReducer, useState } from 'react'

import { useIsClientRendered } from 'src/hooks/useIsClientRendered'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import { format, formatUsd, safeFixedNumber } from '../utils/format'

export const useRouteMarket = () => {
  const searchParams = useSearchParams()
  const asset = searchParams?.get('asset')

  const { data: market } = useMarketDataAllProxiedMarketSummaries({
    select: (summaries) => {
      const markets = parseMarketSummaries(summaries)
      return markets.find((m) => m.asset === asset)
    },
    // cacheOnBlock: true,
    // watch: true,
  })

  return market
}

const Markets = () => {
  const { data: markets } = useMarketDataAllProxiedMarketSummaries({
    select: parseMarketSummaries,
  })

  const blocksAgo = -7100
  const { data: markets24hrsAgo } = useMarketDataAllProxiedMarketSummaries({
    overrides: { blockTag: blocksAgo },
    select: parseMarketSummaries,
  })

  const isClientRendered = useIsClientRendered()

  const router = useRouter()
  const routeMarket = useRouteMarket()

  if (!markets || !isClientRendered) return null

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="px-1 text-xs text-neutral-400">Markets</h1>
      <div className="overflow-y-auto overflow-x-hidden">
        {markets.map(({ address, asset, price }, i) => (
          <a
            key={address}
            onClick={() => router.replace(`?asset=${asset}`)}
            data-selected={routeMarket?.address === address}
            className="flex w-40 items-center justify-between rounded-lg px-2 py-1 hover:bg-neutral-800 data-[selected=true]:bg-neutral-800"
          >
            <span className="text-sm font-semibold text-neutral-200">{asset}</span>
            <div className="flex flex-col items-end">
              <span className="text-xs text-neutral-400">{format(price)}</span>
              {markets24hrsAgo && (
                <span className="text-xs text-neutral-600">{format(markets24hrsAgo[i].price)}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const Orders = () => {
  const market = useRouteMarket()

  const { data: offchainDelayedOrderMaxAge } = useMarketSettingsOffchainDelayedOrderMaxAge({
    args: market && [market.address],
    enabled: !!market,
    select: (v) => v.toNumber(),
  })

  const { address } = useAccount()

  const { data: order } = useMarketDelayedOrders({
    args: address && [address],
    address: market?.address,
    select: parseOrder,
  })

  const isClientRendered = useIsClientRendered()

  if (!market || !order || !isClientRendered) return null

  const size = order.sizeDelta
  const side = size.isNegative() ? 'Short' : 'Long'

  const hasOpenOrder = !size.isZero()

  const submittedAt = order.intentionTime * 1000
  const isExpired = offchainDelayedOrderMaxAge
    ? Date.now() > submittedAt + offchainDelayedOrderMaxAge * 1000
    : false

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-neutral-800/40 p-2">
      <div className="px-1">
        <h1 className="mb-0.5 text-xs text-neutral-400">Delayed Order</h1>
        {hasOpenOrder ? (
          <p className="text-xs text-neutral-500">You can have only one order per market</p>
        ) : (
          <span className="text-xs text-neutral-500">No open order</span>
        )}
      </div>
      {hasOpenOrder && (
        <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-neutral-800">
          <span className="text-sm text-neutral-200">{market.asset}</span>
          {isExpired && (
            <button className="rounded-lg bg-red-400/10 px-2 py-0.5 text-xs text-red-400">
              expired
            </button>
          )}
          <span className="text-xs text-neutral-400">
            <span
              data-isShort={size.isNegative()}
              className={`mr-3 text-xs data-[isShort=true]:text-red-400 data-[isShort=false]:text-green-400`}
            >
              {side}
            </span>
            {format(size)} ETH
          </span>
        </div>
      )}
    </div>
  )
}

const Position = () => {
  const { address } = useAccount()
  const market = useRouteMarket()

  const { data: positionDetails } = useMarketDataPositionDetails({
    enabled: !!market && !!address,
    args: market && address && [market?.address, address],
    select: parsePositionDetails,
  })
  const position = positionDetails?.position

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market?.address,
    enabled: !!position?.size,
    args: position && [
      BigNumber.from(position?.size).mul(-1),
      DEFAULT_PRICE_IMPACT_DELTA,
      TrackingCode,
    ],
  })
  const { write: closePosition } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  // const { config } = usePrepareMarketClosePositionWithTracking({
  //   address: market?.address,
  //   args: [DEFAULT_PRICE_IMPACT_DELTA, TrackingCode],
  // })
  // const { write: closePosition } = useMarketClosePositionWithTracking(config)

  const isClientRendered = useIsClientRendered()

  if (!market || !position || !isClientRendered) return null

  const size = position.size
  const side = size.isNegative() ? 'Short' : 'Long'

  const hasPosition = !size.isZero()

  // const priceChange = market.price.subUnsafe(position.lastPrice)
  const profitLoss = positionDetails.profitLoss

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="px-1 text-xs text-neutral-400">Position</h1>
      {!hasPosition ? (
        <span className="px-1 text-xs text-neutral-500">No open position</span>
      ) : (
        <div
          onClick={closePosition}
          className="flex flex-col rounded-lg px-2 py-1 hover:bg-neutral-800 active:scale-95"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-200">{market.asset}</span>
            <span className={`text-xs ${size.isNegative() ? 'text-red-400' : 'text-green-400'}`}>
              {side}
            </span>
            <span className="text-xs text-neutral-400">
              {format(size)} ETH ({formatUsd(positionDetails.notionalValue)})
            </span>
          </div>
          <span
            className={cx('text-xs', profitLoss.isNegative() ? 'text-red-400' : 'text-green-500')}
          >
            P&L: {formatUsd(profitLoss)}
          </span>
          {/* Entry */}
          <span className="text-xs text-neutral-400">Entry: {formatUsd(position.lastPrice)}</span>
        </div>
      )}
    </div>
  )
}

/*
  # Increasing and decreasing the skew
  skew       = 10
  size       = -15
  skewResult = -5
  fee        = 10 * price * makerFee + 5 * price * takerFee
*/
export const Fees = ({ sizeDelta }: { sizeDelta: FixedNumber }) => {
  const market = useRouteMarket()

  if (!market) return null

  const { feeRates, marketSkew } = market

  const fee =
    sizeDelta.isNegative() && marketSkew.isNegative()
      ? feeRates.makerFeeOffchainDelayedOrder
      : feeRates.takerFeeOffchainDelayedOrder

  const positionFee = sizeDelta.mulUnsafe(fee)

  return (
    <div>
      <span className="text-light-500 ocean:text-ocean-200 text-sm font-medium">
        Fee: {format(positionFee, { signDisplay: 'never' })} sUsd
      </span>
    </div>
  )
}

export const TrackingCode = formatBytes32String('conduit')

export const DEFAULT_PRICE_IMPACT_DELTA = BigNumber.from('500000000000000000')

export type InputState = { value: string; type: 'usd' | 'size' | 'asset' }
export const deriveInputs = (input?: InputState, price?: FixedNumber, leverage?: FixedNumber) => {
  const { value, type } = input || {}
  if (!value || !type) return { usd: '', asset: '', size: '' }
  if (!price || price.isZero() || !leverage) return { usd: '', asset: '', size: '', [type]: value }

  const amount = safeFixedNumber(value)
  const _leverage = leverage.isZero() ? FixedNumber.from(1) : leverage
  return {
    usd: () => ({
      usd: value,
      asset: amount.divUnsafe(price),
      size: amount.divUnsafe(price).mulUnsafe(_leverage),
    }),
    asset: () => ({
      usd: amount.mulUnsafe(price),
      asset: value,
      size: amount.mulUnsafe(_leverage),
    }),
    // size input is denominated in asset (size = asset * leverage)
    size: () => ({
      usd: amount.divUnsafe(_leverage).mulUnsafe(price),
      asset: amount.divUnsafe(_leverage),
      size: value,
    }),
  }[type]()
}

export const AmountInput = ({
  onChange,
  inputs,
}: {
  onChange: (s: InputState) => void
  inputs: ReturnType<typeof deriveInputs>
}) => {
  const [amountDenominator, toggleAmountDenominator] = useReducer(
    (s) => (s === 'usd' ? 'asset' : 'usd'),
    'usd',
  )

  return (
    <div className="text-light-500  bg-light-300 ocean:bg-ocean-600 flex h-[60px] w-full justify-between rounded-xl px-3">
      <NumericInput
        className="text-light-500 placeholder:text-light-400 w-52 max-w-full bg-transparent text-xl font-bold outline-none "
        placeholder="0.00"
        value={inputs[amountDenominator].toString()}
        onValueChange={({ value }, { source }) => {
          if (source === 'event') onChange({ value, type: amountDenominator })
        }}
      />
      <button onClick={toggleAmountDenominator} className=" text-sm font-medium text-neutral-600">
        {amountDenominator}
      </button>
    </div>
  )
}

const OpenPosition = () => {
  const market = useRouteMarket()

  const price = market?.price

  const [leverage, setLeverage] = useState(MAX_LEVERAGE.toString())
  const [input, setInput] = useState<InputState>()

  const inputs = useMemo(
    () => deriveInputs(input, price, safeFixedNumber(leverage)),
    [price, leverage, input],
  )

  const [side, setSide] = useState<'long' | 'short'>('long')

  const debouncedAmountUsd = useDebounce(inputs.size, 150)
  // sizeDelta is submited to the contract, denominated in susd
  const sizeDelta = useMemo(() => {
    const sizeUsd = BigNumber.from(safeFixedNumber(debouncedAmountUsd))
    return side === 'long' ? sizeUsd : sizeUsd.mul(-1)
  }, [debouncedAmountUsd, side])

  const priceImpact = DEFAULT_PRICE_IMPACT_DELTA

  const { address } = useAccount()
  const { data } = useMarketPostTradeDetails({
    address: market && market.address,
    enabled: !sizeDelta.isZero() && !!address,
    args: [sizeDelta, BigNumber.from(0), 2, address!],
    onSuccess: (d) =>
      console.log({
        margin: FixedNumber.fromValue(d.margin, 18).toString(),
        liquidationPrice: FixedNumber.fromValue(d.liqPrice, 18).toString(),
        fee: FixedNumber.fromValue(d.fee, 18).toString(),
        price: FixedNumber.fromValue(d.price, 18).toString(),
      }),
  })

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market && market.address,
    enabled: !sizeDelta.isZero(),
    args: [BigNumber.from(sizeDelta), priceImpact, TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  if (!market) return null

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-neutral-800/40 p-4">
      <div className="flex max-w-full flex-col">
        {/* <AmountInput inputs={inputs} onChange={setInput} /> */}
        <NumericInput
          className="w-52 max-w-full bg-transparent text-2xl font-bold text-neutral-200 outline-none placeholder:text-neutral-400 "
          placeholder="0.00"
          value={inputs.size.toString()}
          onValueChange={({ value }, { source }) => {
            if (source === 'event') setInput({ value, type: 'size' })
          }}
        />
        <NumericInput
          className="w-52 max-w-full bg-transparent text-2xl font-bold text-neutral-200 outline-none placeholder:text-neutral-400 "
          placeholder="0.00"
          defaultValue={25}
          prefix="x"
          onValueChange={({ value }, { source }) => {
            if (source === 'event') setLeverage(value)
          }}
        />
      </div>
      {price && (
        <span className="text-xs text-neutral-200">
          Position size {format(inputs.size)} {market.asset}
        </span>
      )}
      <div className="flex items-center justify-center gap-3">
        <button
          data-active={side === 'long'}
          className="rounded-full bg-green-600/20 px-5 py-1 outline-1 outline-offset-2 outline-green-700 hover:opacity-80 active:scale-[.98] data-[active=true]:outline"
          onClick={() => setSide('long')}
        >
          <span className="font-bold text-neutral-200">Buy/Long</span>
        </button>
        <button
          data-active={side === 'short'}
          className="rounded-full bg-red-600/20 px-5 py-1 outline-1 outline-offset-2 outline-red-700 hover:opacity-80 active:scale-[.98] data-[active=true]:outline"
          onClick={() => setSide('short')}
        >
          <span className="font-bold text-neutral-200">Sell/Short</span>
        </button>
      </div>
      {/* <Fees sizeDelta={sizeDelta} /> */}
      <button
        className="w-full rounded-full bg-neutral-800 px-4 py-1.5 text-sm font-bold text-white hover:opacity-75 active:scale-[.98] disabled:text-neutral-600 disabled:hover:opacity-100 disabled:active:scale-100"
        disabled={!submitOrder}
        onClick={() => submitOrder?.()}
      >
        Place order
      </button>
    </div>
  )
}

const DepositMargin = () => {
  const market = useRouteMarket()

  const { config, error } = usePrepareMarketTransferMargin({
    address: market?.address,
    args: [BigNumber.from(50)],
  })
  const { write } = useMarketTransferMargin(config)

  return (
    <button
      className="mt-3 rounded-full bg-neutral-800 px-4 py-1.5 text-sm font-bold text-white hover:opacity-75 active:scale-[.98] disabled:text-neutral-600 disabled:hover:opacity-100 disabled:active:scale-100"
      disabled={!write}
      onClick={() => write?.()}
    >
      Deposit margin
    </button>
  )
}

export const MAX_LEVERAGE = FixedNumber.from(25)

const Margin = () => {
  const { address } = useAccount()

  const market = useRouteMarket()

  const { data: accessibleMargin } = useMarketAccessibleMargin({
    address: market && market.market,
    args: address && [address],
    select: (d) => FixedNumber.fromValue(d.marginAccessible, 18),
  })
  const { data: remainingMargin } = useMarketRemainingMargin({
    address: market && market.market,
    args: address && [address],
    select: (d) => FixedNumber.fromValue(d.marginRemaining, 18),
  })

  const isClientRendered = useIsClientRendered()

  if (!accessibleMargin || !remainingMargin || !market || !isClientRendered) return null

  const buyingPower = remainingMargin.mulUnsafe(MAX_LEVERAGE)

  const marginUsed = accessibleMargin.subUnsafe(remainingMargin)

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 px-3 py-2">
      <h1 className="text-xs text-neutral-400">Margin</h1>
      <span className="text-xs text-neutral-200">
        Available margin: {formatUsd(accessibleMargin)}
      </span>
      <div className="flex gap-1">
        <span className="text-xs text-neutral-200">Buying power: {formatUsd(buyingPower)}</span>
        <span className="text-xs text-neutral-400">x{format(MAX_LEVERAGE)}</span>
      </div>
      <span className="text-xs text-neutral-200">Margin used: {formatUsd(marginUsed)}</span>
      <DepositMargin />
    </div>
  )
}

const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const isClientRendered = useIsClientRendered()
  if (isConnected || !isClientRendered) return null
  return (
    <button
      className="mt-3 rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-bold text-neutral-900 hover:opacity-75"
      onClick={openConnectModal}
    >
      Connect Wallet
    </button>
  )
}

const op_usd_feed = '0x0d276fc14719f9292d5c1ea2198673d1f4269246'
const OPPrice = () => {
  const { data: opPrice } = useChainLinkLatestRoundData({
    address: op_usd_feed,
    chainId: 10,
    select: (v) => FixedNumber.fromValue(v.answer, 8),
  })
  const isClientRendered = useIsClientRendered()

  if (!isClientRendered || !opPrice) return null

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 px-3 py-2">
      <span className="text-xs font-medium text-neutral-400">OP price: {formatUsd(opPrice)}</span>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900 font-medium">
      <div className="flex h-[500px] gap-2">
        <Markets />
        <div className="flex h-[500px] w-[300px] flex-col gap-2">
          <ConnectWallet />
          {/* <OPPrice /> */}
          <Orders />
          <Position />
          <Margin />
          <OpenPosition />
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
