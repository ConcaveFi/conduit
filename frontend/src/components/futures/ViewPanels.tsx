import { Tab } from '@headlessui/react'
import { cx, Panel, PanelProps } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'
import { UserPositions } from 'src/perpetuals/positions/UserPositions'
import { UserTrades } from 'src/perpetuals/positions/UserTrades'
import { UserTransfers } from 'src/perpetuals/positions/UserTransfers'

// CONSTANTS -------------------------------------------------------------------

const TABS = ['trade', 'orders', 'trading_history', 'transfers'] as LanguageKeys[]

// COMPONENT ---------------------------------------------------------------------

export const ViewPanels = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return (
    <Tab.Group>
      <Panel
        {...props}
        variant="secondary"
        ref={ref}
        headerProps={{ className: 'min-h-[36px] p-0 pr-2' }}
        headerChild={<Tabs />}
      >
        <Tab.Panels>
          <Tab.Panel>
            <UserPositions />
          </Tab.Panel>
          <Tab.Panel>
            <></>
          </Tab.Panel>
          <Tab.Panel>
            <UserTrades />
          </Tab.Panel>
          <Tab.Panel>
            <UserTransfers />
          </Tab.Panel>
        </Tab.Panels>
      </Panel>
    </Tab.Group>
  )
})

const Tabs = () => {
  const { t } = useTranslation()
  return (
    <Tab.List className={'centered flex h-full gap-2 px-1 '}>
      {TABS.map((tab, index) => {
        return (
          <Tab key={index} className="outline-none h-full ">
            {({ selected }) => {
              const styles = cx(
                'btn text-xs p-[5px_15px]  flex centered outline-none ring-0',
                selected ? 'bg-ocean-400 rounded-md text-ocean-200' : 'btn-underline.secondary',
              )
              return <span className={styles}>{t(tab)}</span>
            }}
          </Tab>
        )
      })}
    </Tab.List>
  )
}
