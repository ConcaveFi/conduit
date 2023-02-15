import { Flex, Panel, PanelProps, Text } from '@tradex/interface'
import { forwardRef } from 'react'

export const NewsPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return (
    <Panel name="News" variant="secondary" className="w-full h-[300px]" ref={ref} {...props}>
      <Flex column className="gap-2 ">
        <Text>Silvergate slides pre-market after suspending preferred dividends</Text>
        <Text size="xs" variant="low">
          The block • 6 minutes ago
        </Text>
      </Flex>
      <Flex className="h-[2px] w-full bg-ocean-400" />
      <Flex column className="gap-2">
        <Text>Silvergate slides pre-market after suspending preferred dividends</Text>
        <Text size="xs" variant="low">
          The block • 6 minutes ago
        </Text>
      </Flex>
      <Flex className="h-[2px] w-full bg-ocean-400" />
      <Flex column className="gap-2">
        <Text>Silvergate slides pre-market after suspending preferred dividends</Text>
        <Text size="xs" variant="low">
          The block • 6 minutes ago
        </Text>
      </Flex>
    </Panel>
  )
})
