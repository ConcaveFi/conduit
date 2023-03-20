import { cx, Panel, PanelProps, Table } from '@tradex/interface'
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
      bodyProps={{ className: 'p-0 overflow-hidden max-h-[100%] group' }}
    >
      {props.children}
      <div className="flex max-h-full flex-1 flex-col">
        {/* Skew */}
        <div className="ocean:bg-blue-20 bg-dark-20 centered flex w-full flex-col gap-1 rounded-b-xl py-3 px-4 ">
          <div className="flex w-full justify-between text-sm">
            <span className="text-positive text-xs">53%</span>
            <span className="text-xs text-white">Skew</span>
            <span className="text-negative text-xs">47%</span>
          </div>
          <div className="flex h-3  w-full overflow-hidden  rounded-full  ">
            <div className="bg-positive h-full w-[53%] "></div>
            <div className="bg-negative h-full w-[47%] "></div>
          </div>
        </div>

        {/* Table */}
        <div className="flex w-full flex-col overflow-auto p-4">
          <Table className="text-end">
            <thead>
              <tr className="text-dark-accent  ocean:text-blue-accent border-dark-main-bg ocean:border-blue-main-bg  border-b-2 text-xs">
                <td className="pb-2">Price</td>
                <td className="pb-2">Amount</td>
                <td className="pb-2 pr-2">Time</td>
              </tr>
            </thead>
            <tbody>
              {new Array(7).fill(0).map((_, i) => {
                const rand = Math.random()
                return (
                  <tr
                    key={i}
                    className="even:ocean:bg-main-bg even:bg-dark-main-bg text-xs font-medium "
                  >
                    <td className={cx(rand > 0.5 ? 'text-positive' : 'text-negative')}> 0.914</td>
                    <td className="ocean:text-ocean-200 py-[6px]  text-white"> $1,644.56</td>
                    <td className="text-dark-accent ocean:text-blue-accent pr-2">30s ago</td>
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
