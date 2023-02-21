import {
  Button,
  Flex,
  PanelProps,
  Table,
  TableBody,
  TableRow,
  TabPanel,
  Text,
  TextAttributes,
  THead,
} from '@tradex/interface'
import { forwardRef } from 'react'
import { queryUrl } from 'src/utils/urlHandler'

// CONSTANTS -------------------------------------------------------------------

const TABS = ['Trade', 'Charts', 'Trading History', 'Activity Log']
const HEADERS = [
  'Market',
  'Side',
  'Size',
  'Leverage',
  'Unrealized P&L',
  'Avg. Entry Price',
  'Liq. Price',
] as const

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
  Market: { variant: 'heading.light' },
  Side: { modifier: 'negative' },
  Size: { variant: 'heading.light' },
  Leverage: { variant: 'heading.light' },
  'Unrealized P&L': { modifier: 'positive' },
  'Avg. Entry Price': { variant: 'heading.light' },
  'Liq. Price': { variant: 'heading.light' },
} as Readonly<{ [key: string]: TextAttributes }>

// COMPONENT ---------------------------------------------------------------------

export const ViewPanels = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const {} = queryUrl('teste', ...HEADERS)
  return (
    <TabPanel.Root {...props} ref={ref} variant="secondary">
      {TABS.map((tab) => (
        <TabPanel.Tab key={tab}>
          {(selected) => (
            <Button size="sm" variant={selected ? 'secondary' : 'underline.secondary'}>
              {tab}
            </Button>
          )}
        </TabPanel.Tab>
      ))}
      <TabPanel.Screen>
        <Flex>
          <Table className="w-full" left>
            <THead variant={'primary'}>
              <TableRow rows={HEADERS}>
                {(element, index) => (
                  <Text key={index} size="sm" variant="low">
                    {element}
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
        </Flex>
      </TabPanel.Screen>
    </TabPanel.Root>
  )
})
