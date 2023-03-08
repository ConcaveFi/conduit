import { OP_ADDRESS, SNX_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon } from '@tradex/icons'
import { ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { FixedNumber } from 'ethers'
import Image from 'next/image'
import { useChainLinkLatestRoundData } from 'perps-hooks'
import { Suspense } from 'react'
import { format, formatUsd } from 'src/utils/format'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { MarketList } from './MarketList'

const OP_USD_FEED = '0x0d276fc14719f9292d5c1ea2198673d1f4269246'
const SNX_FEED = '0x2fcf37343e916eaed1f1ddaaf84458a359b53877'
const ETH_FEED = '0x13e3ee699d1909e989722e753853ae30b17e08c5'
const select = (v) => FixedNumber.fromValue(v.answer, 8)
export function StrategyHeader() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const enabled = Boolean(chain?.id)

  const config = { select, chainId: 10, suspense: true }
  const opPrice = useChainLinkLatestRoundData({ address: OP_USD_FEED, ...config })
  const snxPrice = useChainLinkLatestRoundData({ address: SNX_FEED, ...config })
  const ethPrice = useChainLinkLatestRoundData({ address: ETH_FEED, ...config })
  const { data: sUSD_Balance } = useBalance({ address, token: sUSD_ADDRESS[chain?.id!], enabled })
  const { data: OP_Balance } = useBalance({ address, token: OP_ADDRESS[chain?.id!], enabled })

  return (
    <div className="flex gap-3">
      <div className="centered bg-ocean-700 flex w-[10%] rounded-2xl">
        <MarketList />
      </div>
      <div className="bg-ocean-700 flex min-h-[80px] w-[55%] justify-around rounded-2xl px-6 ">
        <div className="flex sm:gap-2 md:gap-5 lg:gap-10 xl:gap-20 ">
          <ItemInfo info={'Price index'} value="$ 370.00" />
          <ItemInfo info={t('24h_volume')} value="$ 370,526,580" Icon={<BalanceIcon />} />
          <ItemInfo info={t('24h_change')} value="-1.33%" modifier="negative" />
          <ItemInfo info={'1H Funding Rate'} value="0.03%" modifier="positive" />
          <ItemInfo info={'Open interest (L)'} value="$ 4.3M / $ 2.3M" />
          <ItemInfo info={'Open interest (S)'} value="$ 4.3M / $ 2.3M" />
        </div>
      </div>
      <Suspense fallback={tokenFeedSkeletons}>
        <TokenFeeds />
      </Suspense>
    </div>
  )
}

function TokenFeeds() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { address } = useAccount()

  let chainLinkConfig = { select, chainId: 10, suspense: true }
  const opPrice = useChainLinkLatestRoundData({ address: OP_USD_FEED, ...chainLinkConfig })
  const snxPrice = useChainLinkLatestRoundData({ address: SNX_FEED, ...chainLinkConfig })
  const ethPrice = useChainLinkLatestRoundData({ address: ETH_FEED, ...chainLinkConfig })

  const enabled = Boolean(chain?.id)
  const balanceConfig = { address, enabled, suspense: true }
  const { data: sUSD_Balance } = useBalance({ token: sUSD_ADDRESS[chain?.id!], ...balanceConfig })
  const { data: OP_Balance } = useBalance({ token: OP_ADDRESS[chain?.id!], ...balanceConfig })
  const { data: SNX_Balance } = useBalance({ token: SNX_ADDRESS[chain?.id!], ...balanceConfig })
  const { data: ETH_Balance } = useBalance({ ...balanceConfig })

  return (
    <div className="bg-light-100 ocean:bg-ocean-700 flex min-h-[80px] w-[35%] justify-around rounded-2xl ">
      <ItemInfo
        info={'sUSD'}
        value={`$ ${format(FixedNumber.from(sUSD_Balance?.formatted || '0'))}`}
        Icon={<Image width={30} height={30} alt="sUSD logo" src={'/assets/tokens/susd.png'} />}
      />
      <ItemInfo
        info={`OP - ${formatUsd(opPrice?.data || '0.0')}`}
        value={`${format(FixedNumber.from(OP_Balance?.formatted || '0'))}`}
        Icon={<Image width={30} height={30} alt="OP logo" src={'/assets/tokens/op.png'} />}
      />
      <ItemInfo
        info={`SNX - ${formatUsd(snxPrice?.data || '0.0')}`}
        value={`${format(FixedNumber.from(SNX_Balance?.formatted || '0'))}`}
        Icon={<Image width={30} height={30} alt="SNX logo" src={'/assets/tokens/snx.png'} />}
      />
      <ItemInfo
        info={`ETH - ${formatUsd(ethPrice?.data || '0.0')}`}
        value={`${format(FixedNumber.from(ETH_Balance?.formatted || '0'))}`}
        Icon={<Image width={30} height={30} alt="SNX logo" src={'/assets/tokens/eth.png'} />}
      />
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
const tokenFeedSkeletons = (
  <div className="bg-light-100 ocean:bg-ocean-700 flex min-h-[80px] w-[35%] justify-around rounded-2xl ">
    {tokenFeedSekeleton}
    {tokenFeedSekeleton}
    {tokenFeedSekeleton}
    {tokenFeedSekeleton}
  </div>
)
