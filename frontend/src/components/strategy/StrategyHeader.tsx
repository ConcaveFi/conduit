import { OP_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon, CoinIcon, FundingIcon, GasIcon, PercentIcon } from '@tradex/icons'
import { ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { FixedNumber } from 'ethers'
import { useChainLinkLatestRoundData } from 'perps-hooks'
import { format, formatUsd } from 'src/utils/format'
import { useAccount, useBalance, useFeeData, useNetwork } from 'wagmi'
import { MarketList } from './MarketList'

const OP_USD_FEED = '0x0d276fc14719f9292d5c1ea2198673d1f4269246'
const select = (v) => FixedNumber.fromValue(v.answer, 8)
export function StrategyHeader() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const enabled = Boolean(chain?.id)

  const opPrice = useChainLinkLatestRoundData({ address: OP_USD_FEED, chainId: 10, select })
  const { data: sUSD_Balance } = useBalance({ address, token: sUSD_ADDRESS[chain?.id!], enabled })
  const { data: OP_Balance } = useBalance({ address, token: OP_ADDRESS[chain?.id!], enabled })
  const { data: GasPrice } = useFeeData()

  return (
    <div className="my-8 flex gap-3">
      <div className="bg-ocean-700 flex min-h-[80px] w-full justify-between rounded-2xl px-6 ">
        <MarketList />
        <div className="flex gap-20">
          <ItemInfo info={t('24h_volume')} value="$ 370,526,580" Icon={<BalanceIcon />} />
          <ItemInfo
            info={t('24h_change')}
            value="-1.33%"
            modifier="negative"
            Icon={<PercentIcon />}
          />
          <ItemInfo info={t('open')} value="$ 370,526,580" Icon={<CoinIcon />} />
          <ItemInfo
            modifier="positive"
            info={t('funding_8h')}
            value="+ 0.245%"
            Icon={<FundingIcon />}
          />
        </div>
      </div>
      <div className="bg-light-100 ocean:bg-ocean-700 flex min-h-[80px] w-[44%] justify-around rounded-2xl ">
        <ItemInfo
          info={'sUSD'}
          value={`$ ${format(FixedNumber.from(sUSD_Balance?.formatted || '0'))}`}
          Icon={<CoinIcon />}
        />
        <ItemInfo
          info={`OP - ${formatUsd(opPrice?.data || '0.0')}`}
          value={`${format(FixedNumber.from(OP_Balance?.formatted || '0'))}`}
          Icon={<CoinIcon />}
        />
        <ItemInfo info={'GWEI'} value={GasPrice?.formatted.gasPrice || '0.0'} Icon={<GasIcon />} />
      </div>
    </div>
  )
}
