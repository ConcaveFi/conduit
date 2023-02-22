import { marketDataABI } from 'perps-hooks'
import { ChevronIcon } from '@tradex/icons'
import { Button, ButtonProps, ItemInfo, Menu } from '@tradex/interface'
import { parseBytes32String } from 'ethers/lib/utils.js'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { format } from 'src/utils/format'
import { handleTokenLogo } from 'src/utils/handleTokenLogo'
import { useContractRead } from 'wagmi'
import { optimismGoerli } from 'wagmi/chains'

export function MarketList() {
  const { data: markets } = useContractRead({
    abi: marketDataABI,
    address: '0x0D9eFa310a4771c444233B10bfB57e5b991ad529',
    chainId: optimismGoerli.id,
    functionName: 'allProxiedMarketSummaries',
  })
  const router = useRouter()
  return (
    <Menu className={'h-fit my-auto'}>
      <Menu.Button className="gap-6 outline-none">
        <ItemInfo
          info="BTC Perpetual"
          value="$ 22,910"
          Icon={<Image alt="bitcoin icon" src="/assets/bitcoin.png" width={30} height={30} />}
        />
        <ChevronIcon />
      </Menu.Button>
      <Menu.Items
        column
        variant={'glass'}
        className="w-[360px] h-[500px] left-10 rounded-tl-sm overflow-y-auto p-2"
        origin={'top-left'}
      >
        {markets?.map(({ asset, price }, i) => (
          <Menu.Item key={i}>
            {({ close }) => (
              <MarketButton
                price={format(price.toBigInt(), 18)}
                asset={parseBytes32String(asset || '')}
                onClick={() => {
                  router.replace('/', {
                    query: { asset: parseBytes32String(asset || '') },
                  })
                  close()
                }}
              />
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

interface MarketButton extends ButtonProps {
  asset: string
  price: string
  percent?: string
}
// css-s6i0el-menu
const MarketButton = forwardRef<HTMLButtonElement, MarketButton>(
  ({ asset, price, percent, ...props }, ref) => {
    const styles = 'gap-6 h-fit justify-between even:bg-ocean-600 p-2 px-3 rounded-lg'
    const icon = (
      <Image
        alt="bitcoin icon"
        src={`/assets/tokens/${handleTokenLogo(asset)}.png`}
        className="rounded-full"
        width={30}
        height={30}
      />
    )

    return (
      <Button ref={ref} className={styles} {...props}>
        <ItemInfo info={asset + ' Perpetual '} value={`${asset}-PERP`} Icon={icon} />
        <ItemInfo align="end" info={percent || '0.00%'} value={price} />
      </Button>
    )
  },
)
