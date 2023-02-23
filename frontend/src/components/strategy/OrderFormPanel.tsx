import { sUSD_ADDRESS } from '@tradex/core'
import { CloseIcon } from '@tradex/icons'
import {
  Button,
  CheckBox,
  Flex,
  Input,
  Modal,
  NumericInput,
  Panel,
  PanelProps,
  Slider,
  Text,
} from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { formatUnits } from 'ethers/lib/utils'
import { NextRouter } from 'next/router'
import { ChangeEvent, forwardRef, useState } from 'react'
import { useDisclosure } from 'src/hooks/useDisclosure'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { Address, useNetwork, useToken } from 'wagmi'
import { CurrencyInput } from '../CurrencyInput'
import { OrderTab } from './OrderSelector'

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const [value, setValue] = useState<number>()
  const { t } = useTranslation()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value
    if (value >= 50) value = 50
    if (value <= 0) value = 0
    setValue(value || undefined)
  }

  const [market, setMarket] = useState<Address>()
  const onIsReady = ({ query }: NextRouter) => setMarket((query.market as Address) || '')
  useRouterEvents({ onIsReady })

  const { chain } = useNetwork()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data } = useToken({ address: sUSD_ADDRESS[chain?.id!], enabled: Boolean(chain) })

  const { data: inputToken } = useToken({ address: '0x2db9cB23277C4A73F1c53822AE61A68e55147E33' })
  const [usdValue, setUsd] = useState<number>()

  return (
    <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
      <Button onClick={onOpen} variant={'secondary'} size="xl">
        Deposit Margin
      </Button>
      <Modal
        centered
        column
        isOpen={isOpen}
        onClose={onClose}
        className="w-[400px] h-fit"
        space={'medium.eq'}
      >
        <Text size={'xl'} variant={'heading'}>
          Deposit Margin
        </Text>
        <CurrencyInput
          onValueChange={(v) => setUsd(v.floatValue)}
          onClickBalance={(balance, decimals) => setUsd(+formatUnits(balance, decimals))}
          value={usdValue}
          currency={data}
        />
        <Button
          disabled={!usdValue}
          className="rounded-lg py-6"
          variant={'primary.outline'}
          size="xl"
        >
          {usdValue && ' Confirm deposit'}
          {!usdValue && 'Enter an amount'}
        </Button>
      </Modal>
      <OrderTab />
      <Flex column className={'gap-2'}>
        <Text variant="low" className="px-4">
          {t('amount')}
        </Text>
        <CurrencyInput currency={inputToken} />
        <Flex className="w-full min-h-[60px] bg-ocean-600 rounded-xl px-6">
          <NumericInput disabled variant={'simple'} placeholder="0.0" />
        </Flex>
      </Flex>
      {/* <Flex column className="gap-2">
        <Text variant="low" className="px-4">
          {t('limit price')}
        </Text>
        <Flex centered>
          <CurrencyInput currency="USD" />
          <Button variant="underline" className="px-3">
            GTC <ChevronIcon />
          </Button>
        </Flex>
      </Flex> */}
      <Flex className="gap-6 mx-4 ">
        <CheckBox ripple onToggle={() => {}} info={t('reduce')} />
        <CheckBox ripple onToggle={() => {}} info={t('post')} />
        <CheckBox ripple onToggle={() => {}} info={t('hidden')} />
      </Flex>

      <Flex justify="between" centered>
        <Text variant="medium">{t('leverage')}</Text>
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
          {`${t('position')} 0`}
        </Button>
        <Button className="w-full" variant="secondary.underline" size="lg">
          {`${t('position')} 0`}
        </Button>
      </Flex>
      <Button variant="green-gradient" size="xl">
        {t('buy')}
      </Button>
    </Panel>
  )
})
