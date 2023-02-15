import { Address, useAccount, useContractRead, useContractReads } from 'wagmi'
import { perpsV2MarketAbi } from '@tradex/perps/abis/marketAbi'
import { marketDataAbi } from '@tradex/perps/marketData/marketDataAbi'
import { marketSettingsAbi } from '@tradex/perps/abis/marketSettingsAbi'
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils.js'
import { optimismGoerli } from 'wagmi/chains'
import { format } from '../utils/format'
import { useIsMounted } from 'src/hooks/useIsMounted'

const Markets = () => {
  const { data: markets } = useContractRead({
    abi: marketDataAbi,
    address: '0x0D9eFa310a4771c444233B10bfB57e5b991ad529',
    chainId: optimismGoerli.id,
    functionName: 'allProxiedMarketSummaries',
  })

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

  const { data: order } = useContractRead({
    abi: perpsV2MarketAbi,
    address: market.address,
    chainId: optimismGoerli.id,
    functionName: 'delayedOrders',
    args: [address],
  })

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

  const { data: position } = useContractRead({
    abi: perpsV2MarketAbi,
    address: market.address,
    chainId: optimismGoerli.id,
    functionName: 'positions',
    args: [address],
  })

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

const OpenPosition = ({ market }: { market: { address: Address; key: string } }) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center p-4 rounded-xl bg-neutral-800/40">
      <div>
        <input
          className="font-bold bg-transparent text-3xl placeholder:text-neutral-400"
          placeholder="0.00"
        />
      </div>
      <div className="flex gap-3 items-center justify-center">
        <button className="px-5 py-1 rounded-full bg-green-700">
          <span className="text-neutral-200 font-bold">Buy/Long</span>
        </button>
        <button className="px-5 py-1 rounded-full bg-red-700">
          <span className="text-neutral-200 font-bold">Sell/Short</span>
        </button>
      </div>
    </div>
  )
}

const Margin = ({ market }: { market: { address: Address; key: string } }) => {
  const address = '0xbE230D92AD2b2Dc9D75ff16B550533b5D418C4E0'

  const contract = {
    abi: perpsV2MarketAbi,
    address: market.address,
    chainId: optimismGoerli.id,
  }

  const { data } = useContractReads({
    contracts: [
      { ...contract, functionName: 'remainingMargin', args: [address] },
      { ...contract, functionName: 'accessibleMargin', args: [address] },
    ],
  })

  const isMounted = useIsMounted()

  if (!data || !isMounted) return null

  const [{ marginRemaining }, { marginAccessible }] = data

  return (
    <div className="flex flex-col gap-1 px-3 rounded-xl bg-neutral-800/40 py-2">
      <h1 className="text-xs text-neutral-400">Margin</h1>
      <span className="text-neutral-200 text-xs">
        Remaining: {format(marginRemaining.toBigInt(), 18)}
      </span>
      <span className="text-neutral-200 text-xs">
        Accessible: {format(marginAccessible.toBigInt(), 18)}
      </span>
    </div>
  )
}

const market = {
  address: '0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c',
  key: 'sETH',
} as const

export default function Home() {
  const { data: offchainDelayedOrderMaxAge } = useContractRead({
    abi: marketSettingsAbi,
    address: '0x14fA3376E2ffa41708A0636009A35CAE8D8E2bc7',
    chainId: optimismGoerli.id,
    functionName: 'offchainDelayedOrderMaxAge',
    args: [formatBytes32String('sETHPERP') as Address],
  })

  return (
    <div className="bg-neutral-900 h-screen flex items-center justify-center font-medium">
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
