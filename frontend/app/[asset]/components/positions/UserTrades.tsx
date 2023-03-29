import { cx, Table } from '@tradex/interface'

const HEADERS = ['Date', 'Side', 'Price', 'Trade Size', 'Fees', 'Order Type'] as const
export function UserTrades() {
  return (
    <Table className="w-full">
      <thead>
        <tr className="border-ocean-900 text-ocean-200 border-b-2 text-xs font-medium">
          {HEADERS.map((header, i) => {
            return (
              <td className={cx('pb-2', i === 0 ? 'pl-4' : '')} key={header}>
                {header}
              </td>
            )
          })}
        </tr>
        {/* <TableRow rows={HEADERS} className="text-xs font-medium border-b-2 border-ocean-900">
          {(title, i) => (
            <span className={cx('text-ocean-200', i === 0 ? 'pl-4' : '')}>{title}</span>
          )}
        </TableRow> */}
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
    <tr className="even:bg-ocean-900 px-2 text-xs  font-medium">
      <td className="text-ocean-300 py-1 pl-4">2d ago</td>
      <td className="text-negative">SHORT</td>
      <td className="text-ocean-300">$71,043.90</td>
      <td className="text-ocean-300">3.45</td>
      <td className="text-positive">$3.45</td>
      <td className="text-ocean-300">Delayed Offchain</td>
    </tr>
  )
}
