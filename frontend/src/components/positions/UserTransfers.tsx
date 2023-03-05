import { cx, Table, TableRow } from '@tradex/interface'

const HEADERS = ['Action', 'Amount', 'Date', 'Transaction'] as const
export function UserTransfers() {
  return (
    <Table className="w-full">
      <thead>
        <TableRow rows={HEADERS}>
          {(title) => <span className="text-ocean-200">{title}</span>}
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

// Colors will be changed soon
function TransferRow(props: TransferRowProps) {
  return (
    <tr>
      <td className=" text-ocean-300 capitalize">{props.action}</td>
      <td className={cx(props.action === 'withdraw' ? 'text-red-500' : 'text-green-500')}>
        ${props.amount}
      </td>
      <td className="text-ocean-300">1d ago</td>
      <td className="text-ocean-300">0x292...435234</td>
    </tr>
  )
}
