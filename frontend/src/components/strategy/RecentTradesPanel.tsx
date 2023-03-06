import { cx, Panel, PanelProps, Table, TableRow } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

export const RecentTradesPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <Panel {...props} ref={ref} name={t('recent_trades')} variant="secondary">
      <Table className="text-end">
        <thead>
          <TableRow rows={['Price', 'Amount', 'Time']}>
            {(cell) => <span className="text-ocean-300">{cell}</span>}
          </TableRow>
        </thead>
        <tbody>
          {new Array(7).fill(0).map((_) => {
            const rand = Math.random()

            return (
              <tr key={rand} className="odd:bg-ocean-900  odd:bg-opacity-40">
                <td className={cx(rand > 0.5 ? 'text-positive' : 'text-negative')}> 0.914</td>
                <td className="text-ocean-200 py-[6px]"> $1,644.56</td>
                <td className="text-ocean-200">30s ago</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Panel>
  )
})
