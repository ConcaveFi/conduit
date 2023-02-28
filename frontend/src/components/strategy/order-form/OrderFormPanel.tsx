import { sUSD_ADDRESS } from '@tradex/core'
import { CloseIcon } from '@tradex/icons'
import { NumericInput, Panel, PanelProps, Slider } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { NextRouter } from 'next/router'
import { ChangeEvent, forwardRef, useState } from 'react'
import { useDisclosure } from 'src/hooks/useDisclosure'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { findValueOnUrl } from 'src/utils/urlHandler'
import { useNetwork, useToken } from 'wagmi'
import { optimismGoerli } from 'wagmi/chains'
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
  const { data } = useToken({ address: sUSD_ADDRESS[chain?.id || optimismGoerli.id] })
  const [orderType, setOrderType] = useState<'long' | 'short'>('long')

  return (
    <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
      <button onClick={onOpen} className="btn btn-secondary.outlined centered h-16 rounded-lg">
        Deposit Margin
      </button>
      <DepositMarginModal isOpen={isOpen} onClose={onClose} />

      {/* Place oder section ----------------------------------- */}
      <div className="flex gap-4">
        <button
          onClick={() => setOrderType('long')}
          className={`btn centered flex-1 rounded-lg py-2
            ${orderType === 'long' ? 'btn-green-gradient' : 'btn-down'}  `}
        >
          Long
        </button>
        <button
          onClick={() => setOrderType('short')}
          className={`centered btn flex-1 rounded-lg py-2
            ${orderType === 'short' ? 'btn-red-gradient' : 'btn-down'}`}
        >
          Short
        </button>
      </div>
      <div className={'flex flex-col gap-2'}>
        <span className="text-light-400 ocean:text-ocean-300 px-4">{t('amount')}</span>
        <CurrencyInput currency={data} />
        <div className="bg-light-300 ocean:bg-ocean-600 flex min-h-[60px] w-full items-center rounded-xl px-6">
          <NumericInput disabled variant={'simple'} placeholder="0.0" />
        </div>
      </div>

      {/* Leverage handler ----------------------- */}
      <div className=" flex items-center justify-between px-4">
        <span className="text-light-400 ocean:text-ocean-300">{t('leverage')}</span>
        {[10, 25, 50].map((value) => (
          <button
            key={value}
            onClick={() => setValue(value)}
            className="btn btn-underline.secondary"
          >
            {value}x
          </button>
        ))}
        <div className="bg-light-300 ocean:bg-ocean-600 relative flex h-12 w-[40%] items-center justify-end gap-2 rounded-full px-5 ">
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
            <button onClick={() => setValue(0)} className="absolute left-3 ">
              <CloseIcon className="fill-ocean-300 h-3 w-3" />
            </button>
          )}
        </div>
      </div>
      <Slider max={50} step={0.1} onChange={handleInput} value={value || 0} />
      <button className="btn btn-green-gradient centered h-16 rounded-lg text-xl opacity-50">
        Place Order
      </button>
    </Panel>
  )
})
