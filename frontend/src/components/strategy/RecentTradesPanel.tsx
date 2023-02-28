import { Arrow } from '@tradex/icons'
import { Panel, PanelProps, Text } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

export const RecentTradesPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <Panel {...props} ref={ref} name={t('recent_trades')} variant="secondary">
      <table className="text-end">
        <thead className="border-ocean-400 border-b-2">
          <tr>
            <th className="w-[33%] ">
              <Text size="xs" variant="low">
                {t('price')}
              </Text>
            </th>
            <th className="w-[32%]">
              <Text size="xs" variant="low">
                {t('amount')}
              </Text>
            </th>
            <th className="w-[40%] pr-2">
              <Text size="xs" variant="low">
                {t('total')}
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {new Array(4).fill(0).map((_, i) => (
            <tr key={i} className="odd:bg-ocean-900 h-6">
              <td>
                <Text size="xs" modifier="negative">
                  22,915.0
                </Text>
              </td>
              <td className=" ">
                <div className="relative flex h-6 items-center justify-end ">
                  <Text size="xs" variant="medium">
                    30
                  </Text>
                  <div
                    style={{ width: Math.random() * (60 - 40) + 40 }}
                    className={`px] absolute left-[110%] h-full bg-[#FF2E2E26]`}
                  />
                </div>
              </td>
              <td className="pr-2">
                <Text size="xs" variant="medium">
                  213,900
                </Text>
              </td>
            </tr>
          ))}
          <tr className="bg-ocean-900 h-14 rounded-lg px-2">
            <td className="">
              <div className="items-center justify-end gap-2">
                <Text size="md" modifier="positive">
                  22,915.0
                </Text>
                <Arrow className="h-3 w-3" />
              </div>
            </td>
            <td className="">
              <div className="flex flex-col items-end justify-center">
                <Text size="sm" className="text-white">
                  30
                </Text>
                <Text size="xs">Mark</Text>
              </div>
            </td>
            <td className="pr-2">
              <div className="flex flex-col items-end justify-center">
                <Text size="sm" className="text-white">
                  30
                </Text>
                <Text size="xs">Mark</Text>
              </div>
            </td>
          </tr>
          {new Array(4).fill(0).map((_, i) => (
            <tr key={i} className="odd:bg-ocean-900 ">
              <td>
                <Text size="xs" modifier="positive">
                  22,915.0
                </Text>
              </td>
              <td className=" ">
                <div className="relative flex h-6 items-center justify-end ">
                  <Text size="xs" variant="medium">
                    30
                  </Text>
                  <div
                    style={{ width: Math.random() * (60 - 40) + 40 }}
                    className={`px] absolute left-[110%] h-full bg-[#32FF2E26]`}
                  />
                </div>
              </td>
              <td className="pr-2">
                <Text size="xs" variant="medium">
                  213,900
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
})
