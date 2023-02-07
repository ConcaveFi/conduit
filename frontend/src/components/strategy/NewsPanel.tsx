import { Flex, Panel, Text } from '@exchange/interface'

export function NewsPanel() {
  return (
    <Panel name="News" variant="secondary" className="w-full h-fit">
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
}
