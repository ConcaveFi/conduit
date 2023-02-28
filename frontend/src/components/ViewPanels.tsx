import { PanelProps, Table, TableBody, TableRow, TabPanel, THead } from '@tradex/interface'
import { LanguageKeys, useTranslation } from '@tradex/languages'
import { forwardRef } from 'react'

// CONSTANTS -------------------------------------------------------------------

const TABS = ['trade', 'charts', 'trading_history', 'activity_log'] as LanguageKeys[]
const HEADERS = [
  'market',
  'side.place',
  'size',
  'leverage',
  'unrealized',
  'avg_entry_price',
  'liq_price',
] as LanguageKeys[]

const MOCK_ROWS = [
  'ETH-PERP',
  'SHORT',
  '0.05 (%71.89)',
  ' 1.40 X',
  '$0.24 (0.46%)',
  ' $1,657.20',
  '$2,235.29',
] as const

const STYLES = {
  market: 'text-white',
  'side.place': 'text-red-500',
  size: 'text-white',
  leverage: 'text-white',
  unrealized: 'text-green-400',
  avg_entry_price: 'text-white',
  liq_price: 'text-white',
}

// COMPONENT ---------------------------------------------------------------------

export const ViewPanels = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  return (
    <TabPanel.Root {...props} ref={ref} variant="secondary">
      {TABS.map((tab) => (
        <TabPanel.Tab key={tab}>
          {(selected) => (
            <button className={`${selected ? 'btn-secondary' : 'btn-underline.secondary'}`}>
              {t(tab)}
            </button>
          )}
        </TabPanel.Tab>
      ))}
      <TabPanel.Screen>
        <Table className="w-full" left>
          <THead variant={'primary'}>
            <TableRow rows={HEADERS}>
              {(element, index) => (
                <span key={index} className="text-low text-sm">
                  {t(element)}
                </span>
              )}
            </TableRow>
          </THead>
          <TableBody>
            <TableRow rows={MOCK_ROWS}>
              {(element, index) => (
                <span key={index} className={`text-sm ${STYLES[HEADERS[index]]}`}>
                  {element}
                </span>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TabPanel.Screen>
    </TabPanel.Root>
  )
})
