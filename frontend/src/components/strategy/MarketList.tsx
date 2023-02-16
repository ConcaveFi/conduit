import { ChevronIcon } from '@tradex/icons'
import { Button, ItemInfo, Popover } from '@tradex/interface'
import { marketDataAbi } from '@tradex/perps/marketData/marketDataAbi'
import { parseBytes32String } from 'ethers/lib/utils.js'
import Image from 'next/image'
import { format } from 'src/utils/format'
import { useContractRead } from 'wagmi'
import { optimismGoerli } from 'wagmi/chains'

export function MarketList() {
  const { data: markets } = useContractRead({
    abi: marketDataAbi,
    address: '0x0D9eFa310a4771c444233B10bfB57e5b991ad529',
    chainId: optimismGoerli.id,
    functionName: 'allProxiedMarketSummaries',
  })

  return (
    <Popover className="h-fit my-auto">
      <Popover.Button className="gap-6 outline-none">
        <ItemInfo
          info="BTC Perpetual"
          value="$ 22,910"
          Icon={<Image alt="bitcoin icon" src="/assets/bitcoin.png" width={30} height={30} />}
        />
        <ChevronIcon />
      </Popover.Button>
      <Popover.Panel
        className="w-[360px] h-[500px] left-10 rounded-tl-sm overflow-y-auto p-2 "
        origin={'top-left'}
        variant="glass"
        column
      >
        {markets?.map(({ asset, price }) => (
          <MarketButton
            price={format(price.toBigInt(), 18)}
            asset={parseBytes32String(asset || '')}
          />
        ))}
      </Popover.Panel>
    </Popover>
  )
}

interface MarketButton {
  asset: string
  price: string
  percent?: string
}
// css-s6i0el-menu
function MarketButton({ asset, price, percent }: MarketButton) {
  return (
    <Button className="gap-6 h-fit justify-between even:bg-ocean-600 p-2 px-3 rounded-lg">
      <ItemInfo
        info={asset + ' Perpetual '}
        value={`${asset}-PERP`}
        Icon={<Image alt="bitcoin icon" src="/assets/bitcoin.png" width={30} height={30} />}
      />
      <ItemInfo align="end" info={percent || '0.00%'} value={price} />
    </Button>
  )
}
