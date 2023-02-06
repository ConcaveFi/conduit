import { BalanceIcon, ChevronIcon, CoinIcon, FundingIcon, PercentIcon } from '@exchange/icons'
import { Flex, ItemInfo } from '@exchange/interface'
import Image from 'next/image'

export function StrategyHeader() {
  return (
    <Flex className="w-full h-20 px-6 rounded-2xl bg-ocean-600 " justify="between">
      <Flex centered className="gap-6">
        <ItemInfo
          info="BTC Perpetual"
          value="$ 22,910"
          Icon={<Image alt="bitcoin icon" src="/assets/bitcoin.png" width={30} height={30} />}
        />
        <ChevronIcon />
      </Flex>
      <Flex className="gap-20">
        <ItemInfo info="24h Volume" value="$ 370,526,580" Icon={<BalanceIcon />} />
        <ItemInfo info="24h Change" value="-1.33%" modifier="negative" Icon={<PercentIcon />} />
        <ItemInfo info="Open" value="$ 370,526,580" Icon={<CoinIcon />} />
        <ItemInfo modifier="positive" info="Funding/8h" value="+ 0.245%" Icon={<FundingIcon />} />
      </Flex>
    </Flex>
  )
}
