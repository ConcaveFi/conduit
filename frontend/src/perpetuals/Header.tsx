import { OP_ADDRESS, SNX_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon } from '@tradex/icons'
import { ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { FetchBalanceResult } from '@wagmi/core'
import { format, from } from 'dnum'
import Image from 'next/image'
import { useChainLinkLatestRoundData } from 'perps-hooks'
import { useAccount, useBalance, useNetwork } from 'wagmi'
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

  return (
    <div className="flex flex-wrap gap-3 2xl:flex-nowrap">
      <div className="centered bg-ocean-700 order-2 flex min-h-[80px] w-full rounded-2xl px-5 md:order-[0] md:w-fit ">
        <MarketList />
      </div>
      <div className="bg-ocean-700 -order-1 flex min-h-[80px] w-full flex-wrap justify-around rounded-2xl  md:flex-nowrap xl:order-[0] xl:w-[50%] 2xl:w-[55%] 2xl:px-6 ">
        <ItemInfo info={'Price index'} value="$ 370.00" />
        <ItemInfo info={t('24h_volume')} value="$ 370,526,580" Icon={<BalanceIcon />} />
        <ItemInfo info={t('24h_change')} value="-1.33%" modifier="negative" />
        <ItemInfo info={'1H Funding Rate'} value="0.03%" modifier="positive" />
        <ItemInfo info={'Open interest (L)'} value="$ 4.3M / $ 2.3M" />
        <ItemInfo info={'Open interest (S)'} value="$ 4.3M / $ 2.3M" />
      </div>
      <div className="bg-ocean-700  flex min-h-[80px] w-[35%] flex-1 justify-around gap-4 rounded-2xl px-4 ">
        {sUSDBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <ItemInfo
            info={'sUSD'}
            value={formatBalance(sUSDBalance.data)}
            Icon={<Image width={25} height={25} alt="sUSD logo" src={'/assets/tokens/susd.png'} />}
          />
        )}
        {OPBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <ItemInfo
            info={`OP - $ ${format(opPrice?.data || [0n, 0])}`}
            value={formatBalance(OPBalance.data)}
            Icon={<Image width={25} height={25} alt="OP logo" src={'/assets/tokens/op.png'} />}
          />
        )}
        {SNXBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <ItemInfo
            info={`SNX - $ ${format(snxPrice?.data || [0n, 0])}`}
            value={formatBalance(SNXBalance.data)}
            Icon={<Image width={25} height={25} alt="SNX logo" src={'/assets/tokens/snx.png'} />}
          />
        )}
        {ETHBalance.isLoading ? (
          tokenFeedSekeleton
        ) : (
          <ItemInfo
            info={`ETH - ${format(ethPrice?.data || [0n, 0])}`}
            value={formatBalance(ETHBalance.data)}
            Icon={<Image width={25} height={25} alt="SNX logo" src={'/assets/tokens/eth.png'} />}
          />
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
