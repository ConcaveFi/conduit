import { Tab } from '@headlessui/react'
import { Panel, PanelProps } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'
import { UserPositions } from './positions/UserPositions'

// CONSTANTS -------------------------------------------------------------------

const TABS = ['trade', 'orders', 'trading_history', 'transfers'] as LanguageKeys[]

// COMPONENT ---------------------------------------------------------------------

export const ViewPanels = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return (
    <Tab.Group>
      <Panel {...props} variant="secondary" ref={ref} headerChild={<Tabs />}>
        <Tab.Panels>
          <Tab.Panel>
            <UserPositions />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Panel>
    </Tab.Group>
  )
})

const Tabs = () => {
  const { t } = useTranslation()
  return (
    <Tab.List>
      {TABS.map((tab) => {
        return (
          <Tab key={tab} className="outline-none">
            {({ selected }) => (
              <span
                className={`btn px-4 py-[2px] outline-none ring-0
                ${selected ? 'btn-secondary' : 'btn-underline.secondary'} `}
              >
                {t(tab)}
              </span>
            )}
          </Tab>
        )
      })}
    </Tab.List>
  )
}
