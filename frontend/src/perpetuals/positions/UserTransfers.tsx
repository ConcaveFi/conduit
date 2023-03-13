import { cx, Table, TableRow } from '@tradex/interface'

const HEADERS = ['Action', 'Amount', 'Date', 'Transaction'] as const
export function UserTransfers() {
  return (
    <Table className="w-full">
      <thead>
        <TableRow rows={HEADERS}>
          {(title, index) => (
            <span className={cx('text-ocean-200', index === 0 ? 'pl-4' : '')}>{title}</span>
          )}
        </TableRow>
      </thead>
      <tbody>
        <TransferRow action="deposit" amount={45} />
        <TransferRow action="withdraw" amount={200} />
        <TransferRow action="deposit" amount={10} />
        <TransferRow action="deposit" amount={20} />
      </tbody>
    </Table>
  )
}

export type TransferAction = 'withdraw' | 'deposit'
interface TransferRowProps {
  action: TransferAction
  amount: number
}

function TransferRow(props: TransferRowProps) {
  return (
    <tr className="odd:bg-ocean-900 odd:bg-opacity-50 text-xs font-medium">
      <td className="text-ocean-300 py-1 pl-4 capitalize">{props.action}</td>
      <td className={cx(props.action === 'withdraw' ? 'text-negative' : 'text-positive')}>
        ${props.amount}
      </td>
      <td className="text-ocean-300">1d ago</td>
      <td className="text-ocean-300">0x292...435234</td>
    </tr>
  )
}
