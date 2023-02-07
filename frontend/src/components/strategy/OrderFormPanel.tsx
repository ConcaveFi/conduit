import { ChevronIcon } from '@exchange/icons'
import { Button, Flex, Panel, Text } from '@exchange/interface'
import { CurrencyInput } from '../CurrencyInput'
import { OrderTab } from './OrderSelector'

export function OrderFormPanel() {
  return (
    <Panel name="Order Form" className="w-3/12">
      <OrderTab />
      <Flex column className="gap-2">
        <Text variant="low">Amount</Text>
        <CurrencyInput currency="USD" />
        <CurrencyInput currency="BTC" />
      </Flex>
      <Flex column className="gap-2">
        <Text variant="low">Limit Price</Text>
        <Flex centered>
          <CurrencyInput currency="USD" />
          <Button variant="underline" className="px-3">
            GTC <ChevronIcon />
          </Button>
        </Flex>
      </Flex>
      <Button variant="green-gradient" size="xl">
        Buy
      </Button>
    </Panel>
  )
}
