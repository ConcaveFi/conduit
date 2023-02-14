import { ChevronIcon, CloseIcon } from '@tradex/icons'
import { Button, CheckBox, Flex, Input, Panel, PanelProps, Slider, Text } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { ChangeEvent, forwardRef, useState } from 'react'
import { CurrencyInput } from '../CurrencyInput'
import { OrderTab } from './OrderSelector'

export const OrderFormPanel = forwardRef<HTMLDivElement, PrimitiveDivProps>((props, ref) => {
  const [value, setValue] = useState<number>()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value
    if (value >= 50) value = 50
    if (value <= 0) value = 0
    setValue(value || undefined)
  }
  return (
    <Panel ref={ref} {...props} name="Order Form" className="w-3/12 ">
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
      <Flex justify="between" centered>
        <Text variant="medium">Leverage</Text>
        <Flex className="w-[40%] justify-end items-center px-2 gap-2 h-12 rounded-full relative bg-ocean-600 ">
          <Input
            className="w-[60%] text-end"
            max={50}
            min={0}
            variant="simple"
            type={'number'}
            placeholder={'0.0'}
            value={value || ''}
            onChange={handleInput}
          />
          {!!value && (
            <Button onClick={() => setValue(0)}>
              <CloseIcon className="w-3 h-3 fill-ocean-300 absolute left-3" />
            </Button>
          )}
        </Flex>
      </Flex>
      <Slider max={50} step={0.1} track onChange={handleInput} value={value || 0} />
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
})
