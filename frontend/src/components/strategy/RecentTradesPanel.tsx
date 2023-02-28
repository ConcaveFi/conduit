import { Arrow } from '@tradex/icons'
import { Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

export const RecentTradesPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <Panel {...props} ref={ref} name={t('recent_trades')} variant="secondary">
      <table className="text-end">
        <thead className="ocean:border-ocean-400 border-b-2">
          <tr>
            <th className="w-[33%] ">
              <span className="text-light-400 ocean:text-ocean-300 text-xs">{t('price')}</span>
            </th>
            <th className="w-[32%]">
              <span className="text-light-400 ocean:text-ocean-300 text-xs">{t('amount')}</span>
            </th>
            <th className="w-[40%] pr-2">
              <span className="text-light-400 ocean:text-ocean-300 text-xs">{t('total')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {new Array(4).fill(0).map((_, i) => (
            <tr key={i} className="odd:bg-light-300 ocean:odd:bg-ocean-900 h-6">
              <td>
                <span className="text-xs text-red-500">22,915.0</span>
              </td>
              <td className=" ">
                <div className="relative flex h-6 items-center justify-end ">
                  <span className="text-medium text-xs">30</span>
                  <div
                    style={{ width: Math.random() * (60 - 40) + 40 }}
                    className={`px] absolute left-[110%] h-full bg-[#FF2E2E26]`}
                  />
                </div>
              </td>
              <td className="pr-2">
                <span className="text-medium text-xs">213,900</span>
              </td>
            </tr>
          ))}
          <tr className="bg-light-300 ocean:bg-ocean-900 h-14 rounded-lg px-2">
            <td className="">
              <div className=" flex w-full items-center justify-end gap-2">
                <span className="text-[16px] text-green-500">22,915.0</span>
                <Arrow className="h-3 w-3" />
              </div>
            </td>
            <td className="">
              <div className="flex flex-col items-end justify-center">
                <span className="text-sm text-white">30</span>
                <span className="text-high text-xs">Mark</span>
              </div>
            </td>
            <td className="pr-2">
              <div className="flex flex-col items-end justify-center">
                <span className="text-sm text-white">30</span>
                <span className="text-high text-xs">Mark</span>
              </div>
            </td>
          </tr>
          {new Array(4).fill(0).map((_, i) => (
            <tr key={i} className="odd:bg-light-300 ocean:odd:bg-ocean-900 ">
              <td>
                <span className="text-xs text-green-500">22,915.0</span>
              </td>
              <td className=" ">
                <div className="relative flex h-6 items-center justify-end ">
                  <span className="text-medium text-xs">30</span>
                  <div
                    style={{ width: Math.random() * (60 - 40) + 40 }}
                    className={`px] absolute left-[110%] h-full bg-[#32FF2E26]`}
                  />
                </div>
              </td>
              <td className="pr-2">
                <span className="text-medium text-xs">213,900</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
})
