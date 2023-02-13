import { ChevronIcon } from '@tradex/icons'
import { Button, CheckBox, Flex, Panel, Slider, Text } from '@tradex/interface'
import { useState } from 'react'
import { CurrencyInput } from '../CurrencyInput'
import { OrderTab } from './OrderSelector'

export function OrderFormPanel() {
  const [value, setValue] = useState(0)

  return (
    <Panel name="Order Form" className="w-3/12 ">
      <OrderTab />
      <Flex column className="gap-2">
        <Text variant="low" className="px-4">
          Amount
        </Text>
        <CurrencyInput currency="USD" />
        <CurrencyInput currency="BTC" />
      </Flex>
      <Flex column className="gap-2">
        <Text variant="low" className="px-4">
          Limit Price
        </Text>
        <Flex centered>
          <CurrencyInput currency="USD" />
          <Button variant="underline" className="px-3">
            GTC <ChevronIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex className="gap-6 mx-4 ">
        <CheckBox onToggle={() => {}} info="Reduce" />
        <CheckBox onToggle={() => {}} info="Post" />
        <CheckBox onToggle={() => {}} info="Hidden" />
      </Flex>
      <Slider pseudoMax={50} track onValue={setValue} />
      <Flex className="gap-4 -mb-2 mt-4">
        <Button className="w-full" variant="secondary.underline" size="lg">
          Position 0
        </Button>
        <Button className="w-full" variant="secondary.underline" size="lg">
          Position 0
        </Button>
      </Flex>
      <Button variant="green-gradient" size="xl">
        Buy
      </Button>
      <Button variant="underline.secondary" className="gap-2 mt-4" size="md">
        <ChevronIcon />
        Contract details
      </Button>
      <Flex column>
        {new Array(10).fill(0).map((_, i) => (
          <Flex key={i} justify="between" className="odd:bg-ocean-600 px-3 py-1 rounded-md">
            <Text variant="low">{i % 2 == 0 ? 'Mark Price' : 'Price Source'}</Text>
            <Text variant="high">{i % 2 == 0 ? 'USD 22,900.23' : 'Deribit Bitcoin index'}</Text>
          </Flex>
        ))}
      </Flex>
    </Panel>
  )
}
