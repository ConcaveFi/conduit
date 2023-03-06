import { cx, Panel, PanelProps, Table, TableRow } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

export const RecentTradesPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <Panel
      {...props}
      ref={ref}
      name={t('recent_trades')}
      variant="secondary"
      bodyProps={{ className: 'p-0 overflow-hidden max-h-[100%]' }}
    >
      <div className="flex max-h-full flex-1 flex-col">
        {/* Skew */}
        <div className="bg-ocean-500 centered flex min-h-[70px] w-full flex-col gap-1 rounded-b-xl px-4 ">
          <div className="flex w-full justify-between text-sm">
            <span className="text-positive">53%</span>
            <span className="text-white">Skew</span>
            <span className="text-negative">47%</span>
          </div>
          <div className="w-fu flex h-5  w-full overflow-hidden  rounded-full  ">
            <div className="bg-positive h-full w-[53%] "></div>
            <div className="bg-negative h-full w-[47%] "></div>
          </div>
        </div>

        {/* Table */}
        <div className="flex w-full flex-col overflow-auto p-4">
          <Table className="text-end">
            <thead>
              <TableRow rows={['Price', 'Amount', 'Time']}>
                {(cell) => <span className="text-ocean-300">{cell}</span>}
              </TableRow>
            </thead>
            <tbody>
              {new Array(7).fill(0).map((_, i) => {
                const rand = Math.random()
                return (
                  <tr key={i} className="odd:bg-ocean-900  odd:bg-opacity-40">
                    <td className={cx(rand > 0.5 ? 'text-positive' : 'text-negative')}> 0.914</td>
                    <td className="text-ocean-200 py-[6px]"> $1,644.56</td>
                    <td className="text-ocean-200">30s ago</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>

    </Panel>
  )
})
