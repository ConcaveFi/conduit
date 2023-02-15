import { Button, Flex, PanelProps, TabPanel, TabPanelProps, Text } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { forwardRef } from 'react'

const TABS = ['Trade', 'Charts', 'Trading History', 'Activity Log']
export const ViewPanels = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return (
    <TabPanel.Root {...props} ref={ref} variant="secondary" className="w-full h-fit">
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
          <table className="w-full text-left">
            <thead className="border-b-2 border-ocean-300 border-opacity-40">
              <tr>
                <th>
                  <Text size="sm" variant="low">
                    Market
                  </Text>
                </th>
                <th>
                  <Text size="sm" variant="low">
                    Side
                  </Text>
                </th>
                <th>
                  <Text size="sm" variant="low">
                    Size
                  </Text>
                </th>
                <th>
                  <Text size="sm" variant="low">
                    Leverage
                  </Text>
                </th>
                <th>
                  <Text size="sm" variant="low">
                    Unrealized P&L
                  </Text>
                </th>
                <th>
                  <Text size="sm" variant="low">
                    Avg. Entry Price
                  </Text>
                </th>
                <th>
                  <Text size="sm" variant="low">
                    Liq. Price
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {new Array(4).fill(0).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Text size="sm" variant="heading.light">
                      ETH-PERP
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" modifier="negative" variant="heading.light">
                      SHORT
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" variant="heading.light">
                      0.05 (%71.89)
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" variant="heading.light">
                      1.40 X
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" modifier="positive" variant="heading.light">
                      $0.24 (0.46%)
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" variant="heading.light">
                      $1,657.20
                    </Text>
                  </td>
                  <td>
                    <Text size="sm" variant="heading.light">
                      $2,235.29
                    </Text>
                  </td>
                  <td>
                    <Button variant="underline.secondary">close</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
      </TabPanel.Screen>
    </TabPanel.Root>
  )
})
