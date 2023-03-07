import { cx, Table, TableRow } from '@tradex/interface'

const HEADERS = ['Date', 'Side', 'Price', 'Trade Size', 'Fees', 'Order Type'] as const
export function UserTrades() {
  return (
    <Table className="w-full">
      <thead>
        <TableRow rows={HEADERS}>
          {(title, i) => (
            <span className={cx('text-ocean-200', i === 0 ? 'pl-4' : '')}>{title}</span>
          )}
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
    <tr className="odd:bg-ocean-900 px-2 odd:bg-opacity-50">
      <td className="text-ocean-300 py-1 pl-4">2d ago</td>
      <td className="text-negative">SHORT</td>
      <td className="text-ocean-300">$71,043.90</td>
      <td className="text-ocean-300">3.45</td>
      <td className="text-positive">$3.45</td>
      <td className="text-ocean-300">Delayed Offchain</td>
    </tr>
  )
}
