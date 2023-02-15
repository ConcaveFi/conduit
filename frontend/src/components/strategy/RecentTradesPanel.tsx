import { Arrow } from '@tradex/icons'
import { Flex, Panel, PanelProps, Text } from '@tradex/interface'
import { forwardRef } from 'react'

export const RecentTradesPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return (
    <Panel {...props} ref={ref} name="Recent Trades" variant="secondary" className="w-full h-fit">
      <table className="text-end">
        <thead className="border-b-2 border-ocean-400">
          <tr>
            <th className="w-[33%] ">
              <Text size="xs" variant="low">
                Price
              </Text>
            </th>
            <th className="w-[32%]">
              <Text size="xs" variant="low">
                Amount
              </Text>
            </th>
            <th className="pr-2 w-[40%]">
              <Text size="xs" variant="low">
                total
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
                <Flex justify="end" className="relative h-6 " align="center">
                  <Text size="xs" variant="medium">
                    30
                  </Text>
                  <Flex
                    style={{ width: Math.random() * (60 - 40) + 40 }}
                    className={`absolute bg-[#FF2E2E26] left-[110%] px] h-full`}
                  />
                </Flex>
              </td>
              <td className="pr-2">
                <Text size="xs" variant="medium">
                  213,900
                </Text>
              </td>
            </tr>
          ))}
          <tr className="h-14 rounded-lg px-2 bg-ocean-900">
            <td className="">
              <Flex className="justify-end items-center gap-2">
                <Text size="md" modifier="positive">
                  22,915.0
                </Text>
                <Arrow className="w-3 h-3" />
              </Flex>
            </td>
            <td className="">
              <Flex column align="end" justify="center">
                <Text size="sm" className="text-white">
                  30
                </Text>
                <Text size="xs">Mark</Text>
              </Flex>
            </td>
            <td className="pr-2">
              <Flex column align="end" justify="center">
                <Text size="sm" className="text-white">
                  30
                </Text>
                <Text size="xs">Mark</Text>
              </Flex>
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
                <Flex justify="end" className="relative h-6 " align="center">
                  <Text size="xs" variant="medium">
                    30
                  </Text>
                  <Flex
                    style={{ width: Math.random() * (60 - 40) + 40 }}
                    className={`absolute bg-[#32FF2E26] left-[110%] px] h-full`}
                  />
                </Flex>
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
