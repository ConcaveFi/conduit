import { Panel, PanelProps, Text } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

export const NewsPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <Panel name={t('news')} variant="secondary" className="h-[300px] w-full" ref={ref} {...props}>
      <div className="flex flex-col gap-2 ">
        <Text>Silvergate slides pre-market after suspending preferred dividends</Text>
        <Text size="xs" variant="low">
          The block • 6 minutes ago
        </Text>
      </div>
      <div className="bg-ocean-400 h-[2px] w-full" />
      <div className="flex flex-col gap-2">
        <Text>Silvergate slides pre-market after suspending preferred dividends</Text>
        <Text size="xs" variant="low">
          The block • 6 minutes ago
        </Text>
      </div>
      <div className="bg-ocean-400 h-[2px] w-full" />
      <div className="flex flex-col gap-2">
        <Text>Silvergate slides pre-market after suspending preferred dividends</Text>
        <Text size="xs" variant="low">
          The block • 6 minutes ago
        </Text>
      </div>
    </Panel>
  )
})
