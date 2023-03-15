import { OP_ADDRESS, SNX_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import { FetchBalanceResult } from '@wagmi/core'
import { add, divide, format, from, multiply, sub } from 'dnum'
import Image from 'next/image'
import { useChainLinkLatestRoundData } from 'perps-hooks'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { useMarketSettings, useRouteMarket } from '../lib/market/useMarket'
import { useOffchainPrice } from '../lib/price/useOffchainPrice'
import { MarketList } from './MarketList'

const OP_USD_FEED = '0x0d276fc14719f9292d5c1ea2198673d1f4269246'
const SNX_FEED = '0x2fcf37343e916eaed1f1ddaaf84458a359b53877'
const ETH_FEED = '0x13e3ee699d1909e989722e753853ae30b17e08c5'

const select = (v) => from([v.answer.toBigInt(), 8])

const formatBalance = (b: FetchBalanceResult | undefined) =>
  b ? format(from([b.value.toBigInt(), b.decimals]), 2) : '0.0'

export function StrategyHeader() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { address } = useAccount()

  let chainLinkConfig = { select, chainId: 10 }
  const opPrice = useChainLinkLatestRoundData({ address: OP_USD_FEED, ...chainLinkConfig })
  const snxPrice = useChainLinkLatestRoundData({ address: SNX_FEED, ...chainLinkConfig })
  const ethPrice = useChainLinkLatestRoundData({ address: ETH_FEED, ...chainLinkConfig })

  const enabled = Boolean(chain?.id)
  const balanceConfig = { address, enabled }
  const sUSDBalance = useBalance({ token: sUSD_ADDRESS[chain?.id!], ...balanceConfig })
  const OPBalance = useBalance({ token: OP_ADDRESS[chain?.id!], ...balanceConfig })
  const SNXBalance = useBalance({ token: SNX_ADDRESS[chain?.id!], ...balanceConfig })
  const ETHBalance = useBalance({ ...balanceConfig })

  const market = useRouteMarket()
  const marketSettings = useMarketSettings({ marketKey: market?.key })

  // from(1) to avoid undefined for now
  // TODO: statle handleling for loading states
  const { marketSize = from(1), marketSkew = from(1) } = market || {}
  const fundingRate = market ? format(market?.currentFundingRate, 6) : '0'
  const indexPrice = useOffchainPrice({ marketKey: market?.key })

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
        <Info title={'Price index'}>
          <span className="text-bright-text text-xs font-bold"> ${format(indexPrice, 2)}</span>
        </Info>
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
        {sUSDBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <div className="centered flex gap-2">
            <Image width={25} height={25} alt="sUSD logo" src={'/assets/tokens/susd.png'} />
            <Info title={'sUSD'}>
              <span className="text-bright-text text-xs font-bold">
                {formatBalance(sUSDBalance.data)}
              </span>
            </Info>
          </div>
        )}
        {OPBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <div className="centered flex gap-2">
            <Image width={25} height={25} alt="OP logo" src={'/assets/tokens/op.png'} />
            <Info title={`OP - $ ${format(opPrice?.data || [0n, 0], 2)}`}>
              <span className="text-bright-text text-xs font-bold">
                {formatBalance(OPBalance.data)}
              </span>
            </Info>
          </div>
        )}
        {SNXBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <div className="centered flex gap-2">
            <Image width={25} height={25} alt="SNX logo" src={'/assets/tokens/snx.png'} />
            <Info title={`SNX - $ ${format(snxPrice?.data || [0n, 0], 2)}`}>
              <span className="text-bright-text text-xs font-bold">
                {formatBalance(SNXBalance.data)}
              </span>
            </Info>
          </div>
        )}
        {ETHBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <div className="centered flex gap-2">
            <Image width={25} height={25} alt="ETH logo" src={'/assets/tokens/eth.png'} />
            <Info title={`ETH - $ ${format(ethPrice?.data || [0n, 0], 2)}`}>
              <span className="text-bright-text text-xs font-bold">
                {formatBalance(ETHBalance.data)}
              </span>
            </Info>
          </div>
        )}
      </div>
    </div>
  )
}

const tokenFeedSekeleton = (
  <div className="centered flex gap-2">
    <div className="box-10 animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-100 rounded-full"></div>
    <div className="flex flex-col gap-2">
      <div className="animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-100 h-3 w-8" />
      <div className="animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-100 h-3 w-20" />
    </div>
  </div>
)

function Info({ children, title }) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-ocean-200 whitespace-nowrap text-xs">{title}</span>
      {children}
    </div>
  )
}