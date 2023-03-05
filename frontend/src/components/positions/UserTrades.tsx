import { Table, TableRow } from '@tradex/interface'

const HEADERS = ['Date', 'Side', 'Price', 'Trade Size', 'Fees', 'Order Type'] as const
export function UserTrades() {
  return (
    <Table className="w-full">
      <thead>
        <TableRow rows={HEADERS}>
          {(title) => <span className="text-ocean-200">{title}</span>}
        </TableRow>
      </thead>
      <tbody className="">
        <Trades amount={45} />
        <Trades amount={200} />
        <Trades amount={10} />
        <Trades amount={20} />
      </tbody>
    </Table>
  )
}

interface TradesProps {
  amount: number
}

function Trades(props: TradesProps) {
  return (
    <tr className="">
      <td className="text-ocean-300">2d ago</td>
      <td className="text-negative">SHORT</td>
      <td className="text-ocean-300">$71,043.90</td>
      <td className="text-ocean-300">3.45</td>
      <td className="text-positive">$3.45</td>
      <td className="text-ocean-300">Delayed Offchain</td>
    </tr>
  )
}
