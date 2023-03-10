import { ChevronIcon } from '@tradex/icons'
import { ButtonProps, cx, ItemInfo, Menu, Skeleton } from '@tradex/interface'
import { FixedNumber } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { MarketKey } from 'perps-hooks/markets'
import { forwardRef, memo, useEffect, useRef } from 'react'
import { useMarkets, useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { formatPercent, formatUsd } from 'src/utils/format'
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

export const MarketList = function MarketList() {
  const market = useRouteMarket()
  const { data: markets } = useMarkets()

  if (!market || !markets) return null

  return (
    <Menu className={'my-auto h-fit'}>
      <Menu.Button className="btn centered gap-6 outline-none">
        <SelectedMarket marketKey={market.key} asset={handleSynth(market?.asset)} />
        <ChevronIcon />
      </Menu.Button>
      <Menu.Items className="card card-translucent-glass left-10 h-[500px] w-[360px] origin-top-left overflow-y-auto rounded-tl-sm p-2">
        {markets.map(({ key, asset }) => (
          <Menu.Item key={key}>
            <MarketButton asset={asset} marketKey={key} />
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

type MarketButton = {
  asset: string
  price: string
  marketKey: MarketKey
  percent?: string
} & ButtonProps

function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = state
  })
  return ref.current
}

const Price = memo(function Price({ marketKey }: { marketKey: MarketKey }) {
  const priceChange = FixedNumber.from(0)
  const { data: price } = useSkewAdjustedOffChainPrice({ marketKey })
  // const lastPrice = usePrevious(price)
  // const color = lastPrice.greaterThan(price) ? 'text-red-400' : 'text-green-400'

  return (
    <div className="flex flex-col items-end">
      <span className="text-ocean-200 whitespace-nowrap text-[10px] font-medium">
        {formatPercent(priceChange)}
      </span>
      {!price ? (
        <Skeleton className="w-10" />
      ) : (
        <span className="whitespace-nowrap text-white text-sm font-semibold">
          {formatUsd(price)}
        </span>
      )}
    </div>
  )
})

const MarketButton = forwardRef<HTMLButtonElement, MarketButton>(
  ({ asset, marketKey, percent, ...props }, ref) => {
    return (
      <Link
        href={`?asset=${asset}`}
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
        <Price marketKey={marketKey} />
      </Link>
    )
  },
)
