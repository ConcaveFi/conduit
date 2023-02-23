import { sUSD_ADDRESS } from '@tradex/core'
import { CloseIcon } from '@tradex/icons'
import { Button, Flex, NumericInput, Panel, PanelProps, Slider, Text } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { NextRouter } from 'next/router'
import { ChangeEvent, forwardRef, useState } from 'react'
import { useDisclosure } from 'src/hooks/useDisclosure'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { findValueOnUrl } from 'src/utils/urlHandler'
import { useNetwork, useToken } from 'wagmi'
import { CurrencyInput } from '../../CurrencyInput'
import { DepositMarginModal } from './DepositMarginModal'

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const [value, setValue] = useState<number>()
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value
    if (value >= 50) value = 50
    if (value <= 0) value = 0
    setValue(value || undefined)
  }
  const [market, setMarket] = useState('')
  const onIsReady = ({ query }: NextRouter) => setMarket((query.asset as string) || '')
  const routeComplete = (e: string) => setMarket(findValueOnUrl(e, 'asset'))
  useRouterEvents({ onIsReady, routeComplete })

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data } = useToken({ address: sUSD_ADDRESS[chain?.id!] })
  const [orderType, setOrderType] = useState<'long' | 'short'>('long')

  return (
    <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
      <Button
        onClick={onOpen}
        variant={'secondary.underline'}
        className="rounded-lg h-16"
        size="xl"
      >
        Deposit Margin
      </Button>
      <DepositMarginModal isOpen={isOpen} onClose={onClose} />

      {/* Place oder section ----------------------------------- */}
      <Flex className="gap-4">
        <Button
          onClick={() => setOrderType('long')}
          variant={orderType === 'long' ? 'green-gradient' : 'down'}
          className="rounded-lg"
          size={'xl'}
        >
          Long
        </Button>
        <Button
          onClick={() => setOrderType('short')}
          variant={orderType === 'short' ? 'red-gradient' : 'down'}
          className="rounded-lg"
          size={'xl'}
        >
          Short
        </Button>
      </Flex>
      <Flex column className={'gap-2'}>
        <Text variant="low" className="px-4">
          {t('amount')}
        </Text>
        <CurrencyInput currency={data} />
        <Flex className="w-full min-h-[60px] bg-ocean-600 rounded-xl px-6">
          <NumericInput disabled variant={'simple'} placeholder="0.0" />
        </Flex>
      </Flex>

      {/* Leverage handler ----------------------- */}
      <Flex justify="between" centered>
        <Text variant="medium">{t('leverage')}</Text>
        {[10, 25, 50].map((value) => (
          <Button key={value} onClick={() => setValue(value)} variant={'underline.secondary'}>
            {value}x
          </Button>
        ))}
        <Flex className="w-[40%] justify-end items-center px-2 gap-2 h-12 rounded-full relative bg-ocean-600 ">
          <NumericInput
            className="w-[60%] text-end"
            max={50}
            min={0}
            variant="simple"
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
      <Slider max={50} step={0.1} onChange={handleInput} value={value || 0} />
      <Button className="h-16 rounded-lg opacity-50" variant="green-gradient" size="xl">
        Place Order
      </Button>
    </Panel>
  )
})
