import type { Metadata } from 'next'
import { ProfitCard } from './transactioncard'

export async function generateMetadata({
  searchParams: { profit, leverage, asset, type },
}): Promise<Metadata> {
  const search = new URLSearchParams({ profit, leverage, asset, type })
  const ogImage = `${
    process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
  }/api/profit?${search.toString()}`
  return {
    openGraph: {
      description: 'My profit',
      title: 'Conduit profit',
      images: [ogImage],
    },
  }
}

export default async function Page({ searchParams }) {
  const { profit, leverage, asset, type } = searchParams
  return (
    <div className="font-mono">
      <ProfitCard profit={profit} leverage={leverage} asset={asset} type={type} />
    </div>
  )
}
