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
      <tbody>
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

// Colors will be changed soon
function Trades(props: TradesProps) {
  return (
    <tr>
      <td className="text-ocean-300">
        04.03.2023 <br /> 03:56:23
      </td>
      <td className="text-red-500">SHORT</td>
      <td className="text-ocean-300">$71,043.90</td>
      <td className="text-ocean-300">3.45</td>
      <td className="text-green-300">$3.45</td>
      <td className="text-ocean-300">Delayed Offchain</td>
    </tr>
  )
}
