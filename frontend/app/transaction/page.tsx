import { ProfitCard } from './transactioncard'

export default async function Page({ searchParams }) {
  const { profit, leverage, asset, type } = searchParams
  return (
    <div className="font-mono">
      <ProfitCard
        profit={profit}
        leverage={leverage}
        domain={'http://localhost:3000/'}
        asset={asset}
        type={type}
      />
    </div>
  )
}
