import { Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

export const NewsPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <Panel name={t('news')} variant="secondary" className="h-[300px] w-full" ref={ref} {...props}>
      <div className="flex flex-col gap-2 ">
        <span className="text-light-500 ocean:text-ocean-100">
          Silvergate slides pre-market after suspending preferred dividends
        </span>
        <span className="text-light-400 ocean:text-ocean-300 text-xs font-medium">
          The block • 6 minutes ago
        </span>
      </div>
      <div className="bg-light-300 ocean:bg-ocean-400 h-[2px] w-full" />
      <div className="flex flex-col gap-2 ">
        <span className="text-light-500 ocean:text-ocean-100">
          Silvergate slides pre-market after suspending preferred dividends
        </span>
        <span className="text-light-400 ocean:text-ocean-300 text-xs font-medium">
          The block • 6 minutes ago
        </span>
      </div>
      <div className="bg-light-300 ocean:bg-ocean-400 h-[2px] w-full" />
      <div className="flex flex-col gap-2 ">
        <span className="text-light-500 ocean:text-ocean-100">
          Silvergate slides pre-market after suspending preferred dividends
        </span>
        <span className="text-light-400 ocean:text-ocean-300 text-xs font-medium">
          The block • 6 minutes ago
        </span>
      </div>
    </Panel>
  )
})
