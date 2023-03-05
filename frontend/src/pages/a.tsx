import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMarkets } from 'src/hooks/perps'
import { usePrice } from 'src/hooks/usePrice'

import { formatUsd } from '../utils/format'

const MarketsList = () => {
  const { data: markets } = useMarkets()

  const searchParams = useSearchParams()
  const routeAsset = searchParams?.get('asset')

  if (!markets) return null

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      {markets.map(({ address, asset, price }, i) => (
        <Link
          key={address}
          href={`?asset=${asset}`}
          shallow
          data-selected={routeAsset === asset}
          className="flex w-40 items-center justify-between rounded-lg px-2 py-1 hover:bg-neutral-800 data-[selected=true]:bg-neutral-800"
        >
          <span className="text-sm font-semibold text-neutral-200">{asset}</span>
          <div className="flex flex-col items-end">
            <span className="text-xs text-neutral-400">{formatUsd(price)}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

const Markets = () => {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-neutral-800/40 p-2">
      <h1 className="px-1 text-xs text-neutral-400">Markets</h1>
      <div className="overflow-x-hidden overflow-y-hidden">
        <MarketsList />
      </div>
    </div>
  )
}

const Price = () => {
  const { data } = usePrice({ marketKey: 'sETHPERP', watch: true })
  return (
    <span className="text-sm font-semibold text-neutral-200">
      price: {data?.price && formatUsd(data.price)}
    </span>
  )
}

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900 font-medium">
      <Price />
      <Markets />
    </div>
  )
}
