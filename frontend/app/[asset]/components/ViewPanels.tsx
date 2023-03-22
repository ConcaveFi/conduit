import { Tab } from '@headlessui/react'
import { cx, Panel, PanelProps } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'
import { UserPositions } from './positions/UserPositions'
import { UserTrades } from './positions/UserTrades'
import { UserTransfers } from './positions/UserTransfers'

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
        bodyProps={{ className: 'group' }}
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
        {props.children}
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
          <Tab key={index} className="h-full outline-none ">
            {({ selected }) => {
              return (
                <span
                  aria-selected={selected}
                  className={cx(
                    'btn centered flex rounded-md p-[5px_15px] text-xs outline-none ring-0',
                    'aria-selected:btn-secondary aria-deselected:btn-underline ',
                  )}
                >
                  {t(tab)}
                </span>
              )
            }}
          </Tab>
        )
      })}
    </Tab.List>
  )
}
