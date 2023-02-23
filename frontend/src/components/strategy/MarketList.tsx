import { ChevronIcon } from '@tradex/icons'
import { Button, ButtonProps, ItemInfo, Menu } from '@tradex/interface'
import { parseBytes32String } from 'ethers/lib/utils.js'
import Image from 'next/image'
import { NextRouter } from 'next/router'
import { marketDataAbi } from 'perps-hooks/abis'
import { forwardRef, useMemo, useState } from 'react'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { format } from 'src/utils/format'
import { handleSynth } from 'src/utils/handleTokenLogo'
import { findValueOnUrl } from 'src/utils/urlHandler'
import { useContractRead } from 'wagmi'
import { optimismGoerli } from 'wagmi/chains'

export function MarketList() {
  const { data: markets } = useContractRead({
    abi: marketDataAbi,
    address: '0x0D9eFa310a4771c444233B10bfB57e5b991ad529',
    chainId: optimismGoerli.id,
    functionName: 'allProxiedMarketSummaries',
  })
  const [asset, setAsset] = useState('sETH')

  const { router } = useRouterEvents({ onIsReady, routeComplete })
  function onIsReady({ query }: NextRouter) {
    if (!query.asset) router.push('/', { query: { asset: 'sETH' } })
  }
  function routeComplete(e: string) {
    setAsset(findValueOnUrl(e, 'asset'))
  }

  const price = useMemo(() => {
    const mapped = markets?.find((m) => parseBytes32String(m.asset) === asset)
    if (!mapped?.price) return '$0.00'
    return format(mapped.price.toBigInt(), 18)
  }, [asset, markets])

  const normalized_asset = useMemo(() => handleSynth(asset), [asset])
  return (
    <Menu className={'h-fit my-auto'}>
      <Menu.Button className="gap-6 outline-none">
        <ItemInfo
          info={`${normalized_asset} Perpetual`}
          value={`${price}`}
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
        className="w-[360px] h-[500px] left-10 rounded-tl-sm overflow-y-auto p-2"
        origin={'top-left'}
      >
        {markets?.map(({ asset: _asset, price }, i) => (
          <Menu.Item key={i}>
            {({ close }) => (
              <MarketButton
                price={format(price.toBigInt(), 18)}
                asset={parseBytes32String(_asset || '')}
                onClick={() => {
                  let asset = parseBytes32String(_asset || '')
                  router.replace('/', { query: { asset } })
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
