import { ChevronIcon } from '@tradex/icons'
import { ButtonProps, ItemInfo, Menu, Skeleton, twMerge } from '@tradex/interface'
import { divide, lessThan, multiply, subtract } from 'dnum'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef, useEffect, useRef } from 'react'
import { format } from 'utils/format'
import { handleSynth } from 'utils/handleTokenLogo'
import { useMarkets, useRouteMarket } from '../lib/market/useMarket'
import { MarketKey } from '../lib/price/pyth'
import { useSkewAdjustedOffChainPrice } from '../lib/price/useOffchainPrice'

function SelectedMarket({ asset, marketKey }: { asset: string; marketKey: MarketKey }) {
  const price = useSkewAdjustedOffChainPrice({ marketKey, select: (p) => format(p, 2) })
  return (
    <ItemInfo
      info={`${asset} Perpetual`}
      value={price ? `$ ${price}` : ''}
      Icon={
        <Image
          alt={`${asset} icon`}
          src={`/assets/tokens/${asset?.toLowerCase()}.png`}
          className="rounded-full"
          width={24}
          height={24}
        />
      }
    />
  )
}

export const MarketList = function MarketList() {
  const market = useRouteMarket()
  const { data: markets } = useMarkets()

  if (!market || !markets) return MenuButtonSkeleton

  return (
    <Menu className={'my-auto h-fit'}>
      <Menu.Button className="btn centered gap-6 outline-none">
        <SelectedMarket marketKey={market.key} asset={handleSynth(market?.asset)} />
        <ChevronIcon />
      </Menu.Button>
      <Menu.Items className="card card-translucent-glass left-10 h-[500px] w-[360px] origin-top-left overflow-y-auto rounded-tl-sm p-2">
        {markets &&
          markets.map(({ key, asset }) => (
            <Menu.Item key={key}>
              <MarketButton asset={asset} marketKey={key} />
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  )
}

// commented price to fix build as we are not using this price yet.
type MarketButton = {
  asset: string
  // price: string
  marketKey: MarketKey
  percent?: string
} & ButtonProps

function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = state
  }, [state])
  return ref.current
}

export function Price({ marketKey }: { marketKey: MarketKey }) {
  const price = useSkewAdjustedOffChainPrice({ marketKey })
  const lastPrice = usePrevious(price)
  const priceChange =
    price && lastPrice && multiply(divide(subtract(price, lastPrice), lastPrice), 100)
  const color = priceChange && lessThan(priceChange, 0) ? 'text-red-400' : 'text-green-400'

  return (
    <div className="flex flex-col items-end">
      <span className={twMerge('text-ocean-200 whitespace-nowrap text-[10px] font-medium', color)}>
        {format(priceChange, 2)}%
      </span>
      {!price ? (
        <Skeleton className="w-10" />
      ) : (
        <span className="whitespace-nowrap text-sm font-semibold text-white">
          {format(price, 2)}
        </span>
      )}
    </div>
  )
}

const MarketButton = forwardRef<HTMLAnchorElement, MarketButton>(
  ({ asset, marketKey, ...props }, ref) => {
    return (
      <Link
        href={`/${asset}`}
        replace
        ref={ref}
        className={
          'btn even:bg-light-400 ocean:even:bg-ocean-600 h-fit justify-between gap-6 rounded-lg p-2 px-3'
        }
        {...(props as any)} // added "as any", buz ButtonProps is not compatible with, Link props, need to fix in future.
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

const MenuButtonSkeleton = (
  <div className="centered flex gap-2">
    <div className="box-[25px] animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-200 rounded-full"></div>

    <div className="flex flex-col items-start gap-2">
      <div className="animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-200 h-2 w-10"></div>
      <div className="animate-skeleton skeleton-from-ocean-500 skeleton-to-ocean-200 h-2 w-20"></div>
    </div>
  </div>
)
