import { PanelProps, Table, TableBody, TableRow, TabPanel, Text, THead } from '@tradex/interface'
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
  market: { variant: 'heading.light' },
  'side.place': { modifier: 'negative' },
  size: { variant: 'heading.light' },
  leverage: { variant: 'heading.light' },
  unrealized: { modifier: 'positive' },
  avg_entry_price: { variant: 'heading.light' },
  liq_price: { variant: 'heading.light' },
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
                <Text key={index} size="sm" variant="low">
                  {t(element)}
                </Text>
              )}
            </TableRow>
          </THead>
          <TableBody>
            <TableRow rows={MOCK_ROWS}>
              {(element, index) => (
                <Text key={index} size={'sm'} {...STYLES[HEADERS[index]]}>
                  {element}
                </Text>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TabPanel.Screen>
    </TabPanel.Root>
  )
})
