import { OP_ADDRESS, sUSD_ADDRESS } from '@tradex/core'
import { BalanceIcon, CoinIcon, FundingIcon, GasIcon, PercentIcon } from '@tradex/icons'
import { Flex, ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { FixedNumber } from 'ethers'
import { format } from 'src/utils/format'
import { useAccount, useBalance, useFeeData, useNetwork } from 'wagmi'
import { MarketList } from './MarketList'

export function StrategyHeader() {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const enabled = Boolean(chain?.id)

  const { data: sUSD_Balance } = useBalance({ address, token: sUSD_ADDRESS[chain?.id!], enabled })
  const { data: OP_Balance } = useBalance({ address, token: OP_ADDRESS[chain?.id!], enabled })
  const { data: GasPrice } = useFeeData()

  return (
    <Flex className="gap-3">
      <Flex className="bg-ocean-600 min-h-[80px] w-full rounded-2xl px-6 " justify="between">
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
      <Flex className="px-  bg-ocean-600 min-h-[80px] w-[44%] rounded-2xl " justify={'around'}>
        <ItemInfo
          info={'sUSD'}
          value={`$ ${format(FixedNumber.from(sUSD_Balance?.formatted || '0'))}`}
          Icon={<CoinIcon />}
        />
        <ItemInfo
          info={'OP'}
          value={`$ ${format(FixedNumber.from(OP_Balance?.formatted || '0'))}`}
          Icon={<CoinIcon />}
        />
        <ItemInfo info={'GWEI'} value={GasPrice?.formatted.gasPrice || '0.0'} Icon={<GasIcon />} />
      </Flex>
    </Flex>
  )
}
