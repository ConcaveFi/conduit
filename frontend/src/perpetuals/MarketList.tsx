import { ChevronIcon } from '@tradex/icons'
import { ButtonProps, ItemInfo, Menu } from '@tradex/interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MarketKey } from 'perps-hooks/markets'
import { forwardRef } from 'react'
import { useMarkets, useRouteMarket } from 'src/perpetuals/hooks/useMarket'

import { format, formatUsd } from 'src/utils/format'
import { handleSynth } from 'src/utils/handleTokenLogo'
import { useSkewAdjustedOffChainPrice } from './hooks/useOffchainPrice'

function SelectedMarket({ asset, marketKey }: { asset: string; marketKey: MarketKey }) {
  const { data: price } = useSkewAdjustedOffChainPrice({ marketKey })
  return (
    <ItemInfo
      info={`${asset} Perpetual`}
      value={price ? formatUsd(price) : ''}
      Icon={
        <Image
          alt={`${asset} icon`}
          src={`/assets/tokens/${asset?.toLowerCase()}.png`}
          className="rounded-full"
          width={30}
          height={30}
        />
      }
    />
  )
}

export function MarketList() {
  const router = useRouter()

  const market = useRouteMarket()
  const { data: markets } = useMarkets()
  const normalized_asset = handleSynth(market?.asset)

  if (!market || !markets) return null

  const handleAssetClick = (asset: string, close: VoidFunction) => () => {
    router.replace({ query: { asset } }, undefined, { shallow: true })
    close()
  }
  return (
    <Menu className={'my-auto h-fit'}>
      <Menu.Button className="btn centered gap-6 outline-none">
        <SelectedMarket marketKey={market.key} asset={normalized_asset} />
        <ChevronIcon />
      </Menu.Button>
      <Menu.Items className="card card-translucent-glass left-10 h-[500px] w-[360px] origin-top-left overflow-y-auto rounded-tl-sm p-2">
        {markets.map(({ key, asset, price }, i) => (
          <Menu.Item key={i}>
            {({ close }) => (
              <MarketButton
                asset={asset}
                marketKey={key}
                price={format(price)}
                onClick={handleAssetClick(asset, close)}
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
  marketKey: MarketKey
}

const MarketButton = forwardRef<HTMLButtonElement, MarketButton>(
  ({ asset, marketKey, percent, ...props }, ref) => {
    // const { data: price } = useSkewAdjustedOffChainPrice({ marketKey })
    return (
      <button
        ref={ref}
        className={
          'btn gap-6 h-fit justify-between even:bg-light-400 ocean:even:bg-ocean-600 p-2 px-3 rounded-lg'
        }
        {...props}
      >
        <ItemInfo
          info={asset + ' Perpetual '}
          value={`${asset}-PERP`}
          Icon={
            <Image
              alt={`${asset} icon`}
              src={`/assets/tokens/${handleSynth(asset).toLowerCase()}.png`}
              className="rounded-full"
              width={30}
              height={30}
            />
          }
        />
        {/* <ItemInfo align="end" info={percent || '0.00%'} value={price && formatUsd(price)} /> */}
      </button>
    )
  },
)
