import { BalanceIcon, CoinIcon, FundingIcon, PercentIcon } from '@tradex/icons'
import { Flex, ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { MarketList } from './MarketList'

export function StrategyHeader() {
  const { t } = useTranslation()

  return (
    <Flex className="w-full min-h-[80px] px-6 rounded-2xl bg-ocean-600 " justify="between">
      <MarketList />
      <Flex className="gap-20">
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
      </Flex>
    </Flex>
  )
}
