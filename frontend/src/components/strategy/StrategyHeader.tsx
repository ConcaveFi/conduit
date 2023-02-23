import { BalanceIcon, CoinIcon, FundingIcon, GasIcon, PercentIcon } from '@tradex/icons'
import { Flex, ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { MarketList } from './MarketList'

export function StrategyHeader() {
  const { t } = useTranslation()

  return (
    <Flex className="gap-3">
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
      <Flex className="w-[44%]  min-h-[80px] px- rounded-2xl bg-ocean-600 " justify={'around'}>
        <ItemInfo info={'sUSD'} value="$ 370,526,580" Icon={<CoinIcon />} />
        <ItemInfo info={'OP'} value="$ 370,526,580" Icon={<CoinIcon />} />
        <ItemInfo info={'GWEI'} value="$ 370,526,580" Icon={<GasIcon />} />
      </Flex>
    </Flex>
  )
}
