import { BalanceIcon, ChevronIcon, CoinIcon, FundingIcon, PercentIcon } from '@tradex/icons'
import { Button, Flex, ItemInfo, Popover, Text } from '@tradex/interface'
import Image from 'next/image'
import { MarketList } from './MarketList'

export function StrategyHeader() {
  return (
    <Flex className="w-full min-h-[80px] px-6 rounded-2xl bg-ocean-600 " justify="between">
      <MarketList />
      <Flex className="gap-20">
        <ItemInfo info="24h Volume" value="$ 370,526,580" Icon={<BalanceIcon />} />
        <ItemInfo info="24h Change" value="-1.33%" modifier="negative" Icon={<PercentIcon />} />
        <ItemInfo info="Open" value="$ 370,526,580" Icon={<CoinIcon />} />
        <ItemInfo modifier="positive" info="Funding/8h" value="+ 0.245%" Icon={<FundingIcon />} />
      </Flex>
    </Flex>
  )
}
