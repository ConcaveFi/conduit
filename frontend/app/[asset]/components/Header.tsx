import { OP_ADDRESS, SNX_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import { Address, FetchBalanceResult } from '@wagmi/core'
import { SupportedChainId } from 'app/providers/wagmi-config'
import { add, divide, from, multiply, sub } from 'dnum'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { PropsWithChildren, ReactNode } from 'react'
import { format } from 'utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { useMarketSettings, useRouteMarket } from '../lib/market/useMarket'
import { PythId, PythIds } from '../lib/price/pyth'
import { ChainLinkFeed, ChainLinkFeeds, useChainLink } from '../lib/price/useChainLink'
import { offchainPricesAtom, useMarketIndexPrice } from '../lib/price/useOffchainPrice'
import { MarketList } from './MarketList'

const formatBalance = (b: FetchBalanceResult | undefined) =>
  b ? format(from([b.value.toBigInt(), b.decimals]), 2) : '0.0'

function Info({ children, title }: PropsWithChildren<{ title: ReactNode }>) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-ocean-200 whitespace-nowrap text-xs">{title}</span>
      {children}
    </div>
  )
}

function PythPriceFeed({ id }: { id: PythId }) {
  const price = useAtomValue(offchainPricesAtom({ network: 'mainnet', id }))
  return <>- {format(price, 2)}</>
}
function ChainlinkPriceFeed({ feed }: { feed: ChainLinkFeed }) {
  const { data: price } = useChainLink(feed)
  if (!price) return null
  return <>- {format(price, 2)}</>
}

function TokenBalance({
  token,
  symbol,
  priceFeed,
}: {
  token: Address | 'eth'
  symbol: string
  priceFeed?: ReactNode
}) {
  const { address: account } = useAccount()
  const { isLoading, data: balance } = useBalance({
    token: token === 'eth' ? undefined : token,
    address: account,
    enabled: !!token && !!account,
  })

  if (isLoading)
    return (
      <div className="centered flex gap-2">
        <div className="box-10 animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-100 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-100 h-3 w-8" />
          <div className="animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-100 h-3 w-20" />
        </div>
      </div>
    )

  return (
    <div className="centered flex gap-2">
      <Image
        width={25}
        height={25}
        alt=""
        src={`/assets/tokens/${symbol.toLocaleLowerCase()}.png`}
      />
      <Info
        title={
          <>
            {symbol} {priceFeed}
          </>
        }
      >
        <span className="text-bright-text text-xs font-bold">{formatBalance(balance)}</span>
      </Info>
    </div>
  )
}

function IndexPrice() {
  const market = useRouteMarket()
  const indexPrice = useMarketIndexPrice({ marketKey: market?.key })
  return (
    <Info title={'Price index'}>
      <span className="text-bright-text text-xs font-bold"> ${format(indexPrice, 2)}</span>
    </Info>
  )
}

export function StrategyHeader() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { address } = useAccount()

  const chainId = !chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId)

  const market = useRouteMarket()
  const marketSettings = useMarketSettings({ marketKey: market?.key })

  // from(1) to avoid undefined for now
  // TODO: statle handleling for loading states
  const { marketSize = from(1), marketSkew = from(1) } = market || {}
  const fundingRate = market ? format(market?.currentFundingRate, 6) : '0'

  const openInterest = {
    long: divide(add(marketSize, marketSkew), 2),
    short: divide(sub(marketSize, marketSkew), 2),
  }
  const openInterestPercent = {
    long: divide(openInterest.long, marketSize),
    short: divide(openInterest.short, marketSize),
  }
  const openInterestUsd = {
    long: multiply(openInterest.long, market?.price || from(0)),
    short: multiply(openInterest.short, market?.price || from(0)),
  }

  const limit = format(
    multiply(marketSettings?.data?.maxMarketValue || from(0), market?.price || from(0)),
    { compact: true },
  )

  return (
    <div className="flex flex-wrap gap-3 2xl:flex-nowrap">
      <div className="centered bg-ocean-700 order-2 flex min-h-[64px] w-full rounded-lg px-5 md:order-[0] md:w-fit ">
        <MarketList />
      </div>
      <div className="bg-ocean-700 -order-1 flex min-h-[64px] w-full  flex-wrap items-center justify-around rounded-lg  md:flex-nowrap xl:order-[0] xl:w-[50%] 2xl:w-[55%] 2xl:px-6 ">
        <IndexPrice />
        <div className="flex gap-2">
          <BalanceIcon />
          <Info title={t('24h_change')}>
            <span className="text-bright-text text-xs font-bold">$ 370,526,580</span>
          </Info>
        </div>
        <Info title={t('24h_change')}>
          <span className="text-negative text-xs font-bold"> -1.33%</span>
        </Info>
        <Info title={'1H Funding Rate'}>
          <span className="text-positive text-xs font-bold">{fundingRate}</span>
        </Info>
        <Info title={'Open interest (L)'}>
          <span className="text-bright-text text-xs font-bold">
            {`$${format(openInterestUsd.long, { compact: true })} / $${limit}`}
          </span>
        </Info>
        <Info title={'Open interest (S)'}>
          <span className="text-bright-text text-xs font-bold">
            {`$${format(openInterestUsd.short, { compact: true })} / $${limit}`}
          </span>
        </Info>
      </div>
      <div className="bg-ocean-700  flex min-h-[64px] w-[35%] flex-1 justify-around gap-4 rounded-lg px-4 ">
        <TokenBalance symbol="sUSD" token={sUSD_ADDRESS[chainId]} />
        <TokenBalance
          symbol="OP"
          token={OP_ADDRESS[chainId]}
          priceFeed={<PythPriceFeed id={PythIds.OP.mainnet} />}
        />
        <TokenBalance
          symbol="SNX"
          token={SNX_ADDRESS[chainId]}
          priceFeed={<ChainlinkPriceFeed feed={ChainLinkFeeds.SNX} />}
        />
        <TokenBalance
          symbol="ETH"
          token="eth"
          priceFeed={<PythPriceFeed id={PythIds.ETH.mainnet} />}
        />
      </div>
    </div>
  )
}
