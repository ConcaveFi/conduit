'use client'

import { OP_ADDRESS, SNX_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import { Address, FetchBalanceResult } from '@wagmi/core'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
import { add, divide, from, multiply, sub } from 'dnum'
import Image from 'next/image'
import { PropsWithChildren, ReactNode } from 'react'
import { useLayout } from 'utils/contants/breakpoints'
import { format } from 'utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { useMarketSettings, useRouteMarket } from '../lib/market/useMarket'
import { useMarketIndexPrice } from '../lib/price/price'
import { MarketKey } from '../lib/price/pyth'
import { ChainLinkFeed, ChainLinkFeeds, useChainLink } from '../lib/price/useChainLink'
import { MarketList } from './MarketList'

const formatBalance = (b: FetchBalanceResult | undefined) =>
  b ? format(from([b.value.toBigInt(), b.decimals]), 2) : '0.00'

function Info({ children, title }: PropsWithChildren<{ title: ReactNode }>) {
  return (
    <div className="flex flex-col items-start font-mono">
      <span className="text-dark-accent ocean:text-blue-accent whitespace-nowrap font-sans text-xs">
        {title}
      </span>
      {children}
    </div>
  )
}

function PythPriceFeed({ marketKey }: { marketKey: MarketKey }) {
  // const price = useAtomValue(offchainPricesAtom({ network: 'mainnet', id }))
  const price = useMarketIndexPrice({ marketKey })
  return <span className="font-mono">- {format(price, 2)}</span>
}
function ChainlinkPriceFeed({ feed }: { feed: ChainLinkFeed }) {
  const { data: price } = useChainLink(feed)
  if (!price) return null
  return <span className="font-mono">- {format(price, 2)}</span>
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

  const isHydrated = useIsHydrated()

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
        <span className="ocean:text-blue-accent text-xs font-bold text-white">
          {formatBalance(isHydrated ? balance : undefined)}
        </span>
      </Info>
    </div>
  )
}

function IndexPrice() {
  const market = useRouteMarket()
  const indexPrice = useMarketIndexPrice({ marketKey: market?.key })
  return (
    <Info title={'Price index'}>
      <span className="ocean:text-blue-accent text-xs font-bold text-white">
        {' '}
        ${format(indexPrice, 2)}
      </span>
    </Info>
  )
}

export function StrategyHeader() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { isMobile, isDesktop } = useLayout()
  const chainId = chain?.id === optimismGoerli.id ? optimismGoerli.id : optimism.id

  const market = useRouteMarket()
  const { data: marketSettings } = useMarketSettings({ marketKey: market?.key })

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
    multiply(marketSettings?.maxMarketValue || from(0), market?.price || from(0)),
    { compact: true },
  )

  return (
    <div className="flex flex-wrap gap-3 2xl:flex-nowrap">
      <div className="centered bg-dark-10 ocean:bg-blue-10 order-2 flex min-h-[64px] w-full rounded-lg  px-5 md:order-[0] md:w-fit ">
        <MarketList />
      </div>
      {isDesktop && (
        <div className="bg-dark-10 ocean:bg-blue-10 -order-1  flex min-h-[64px] w-full flex-wrap  items-center justify-around rounded-lg   md:flex-nowrap xl:order-[0] xl:w-[50%] 2xl:w-[55%] 2xl:px-6 ">
          <IndexPrice />
          <div className="centered flex gap-2">
            <BalanceIcon className="fill-dark-30 ocean:fill-blue-30 box-6" />
            <Info title={t('24h_change')}>
              <span className="ocean:text-blue-accent text-xs font-bold text-white">
                $ 370,526,580
              </span>
            </Info>
          </div>
          <Info title={t('24h_change')}>
            <span className="text-negative text-xs font-bold"> -1.33%</span>
          </Info>
          <Info title={'1H Funding Rate'}>
            <span className="text-positive text-xs font-bold">{fundingRate}</span>
          </Info>
          <Info title={'Open interest (L)'}>
            <span className="ocean:text-blue-accent text-xs font-bold text-white">
              {`$${format(openInterestUsd.long, { compact: true })} / $${limit}`}
            </span>
          </Info>
          <Info title={'Open interest (S)'}>
            <span className="ocean:text-blue-accent text-xs font-bold text-white">
              {`$${format(openInterestUsd.short, { compact: true })} / $${limit}`}
            </span>
          </Info>
        </div>
      )}
      {isDesktop && (
        <div className="bg-dark-10 ocean:bg-blue-10 flex min-h-[64px] w-[35%] flex-1 justify-around gap-4 rounded-lg  px-4 ">
          <TokenBalance symbol="sUSD" token={sUSD_ADDRESS[chainId]} />
          <TokenBalance
            symbol="OP"
            token={OP_ADDRESS[chainId]}
            priceFeed={<PythPriceFeed marketKey="sOPPERP" />}
          />
          <TokenBalance
            symbol="SNX"
            token={SNX_ADDRESS[chainId]}
            priceFeed={<ChainlinkPriceFeed feed={ChainLinkFeeds.SNX} />}
          />
          <TokenBalance
            symbol="ETH"
            token="eth"
            priceFeed={<PythPriceFeed marketKey="sETHPERP" />}
          />
        </div>
      )}
    </div>
  )
}
