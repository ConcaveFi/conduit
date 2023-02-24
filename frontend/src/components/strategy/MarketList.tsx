import { ChevronIcon } from '@tradex/icons'
import { Button, ButtonProps, ItemInfo, Menu } from '@tradex/interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMarketDataAllProxiedMarketSummaries } from 'perps-hooks'
import { forwardRef, useMemo } from 'react'
import { parseMarketSummaries, useRouteMarket } from 'src/pages/perps'
import { format } from 'src/utils/format'
import { handleSynth } from 'src/utils/handleTokenLogo'

export function MarketList() {
  const router = useRouter()

  const market = useRouteMarket()

  const { data: markets } = useMarketDataAllProxiedMarketSummaries({ select: parseMarketSummaries })

  const normalized_asset = useMemo(() => handleSynth(market?.asset), [market?.asset])

  if (!market || !markets) return null

  return (
    <Menu className={'my-auto h-fit'}>
      <Menu.Button className="gap-6 outline-none">
        <ItemInfo
          info={`${normalized_asset} Perpetual`}
          value={format(market.price)}
          Icon={
            <Image
              alt={`${normalized_asset} icon`}
              src={`/assets/tokens/${normalized_asset?.toLowerCase()}.png`}
              className="rounded-full"
              width={30}
              height={30}
            />
          }
        />
        <ChevronIcon />
      </Menu.Button>
      <Menu.Items
        column
        variant={'glass'}
        className="left-10 h-[500px] w-[360px] overflow-y-auto rounded-tl-sm p-2"
        origin={'top-left'}
      >
        {markets.map(({ asset, price }, i) => (
          <Menu.Item key={i}>
            {({ close }) => (
              <MarketButton
                price={format(price)}
                asset={asset}
                onClick={() => {
                  router.replace({ query: { asset } }, undefined, { shallow: true })
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
        src={`/assets/tokens/${handleSynth(asset).toLowerCase()}.png`}
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
