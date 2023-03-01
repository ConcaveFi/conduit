import { CloseIcon } from '@tradex/icons'
import { NumericInput, Panel, PanelProps, Slider } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import {
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { ChangeEvent, forwardRef, useMemo, useState } from 'react'
import { useDisclosure } from 'src/hooks/useDisclosure'
import {
  AmountInput,
  DEFAULT_PRICE_IMPACT_DELTA,
  deriveInputs,
  Fees,
  InputState,
  MAX_LEVERAGE,
  TrackingCode,
  useRouteMarket,
} from 'src/pages/perps'
import { format, safeFixedNumber } from 'src/utils/format'
import { useDebounce } from 'usehooks-ts'
import { DepositMarginModal } from './DepositMarginModal'

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const [leverage, setLeverage] = useState(MAX_LEVERAGE.toString())
  const { t } = useTranslation()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (+value >= 50) value = '50'
    if (+value <= 0) value = '0'
    setLeverage(value)
  }

  const market = useRouteMarket()
  const price = market?.price
  const [input, setInput] = useState<InputState>()

  const inputs = useMemo(
    () => deriveInputs(input, price, safeFixedNumber(leverage)),
    [price, leverage, input],
  )
  const [side, setSide] = useState<'long' | 'short'>('long')

  const debouncedAmountUsd = useDebounce(inputs.size, 150)
  // sizeDelta is submited to the contract, denominated in susd
  const sizeDelta = useMemo(() => {
    if (!price) return FixedNumber.from(0)
    const sizeUsd = safeFixedNumber(debouncedAmountUsd).mulUnsafe(price)
    return side === 'long' ? sizeUsd : sizeUsd.mulUnsafe(FixedNumber.from(-1))
  }, [debouncedAmountUsd, side, price])

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market && market.address,
    enabled: !sizeDelta.isZero(),
    args: [BigNumber.from(sizeDelta), BigNumber.from(DEFAULT_PRICE_IMPACT_DELTA), TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  const { isOpen, onClose, onOpen } = useDisclosure()

  if (!market) return null
  return (
    <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
      <button onClick={onOpen} className="btn btn-secondary.outlined centered h-16 rounded-lg">
        Deposit Margin
      </button>
      <DepositMarginModal isOpen={isOpen} onClose={onClose} />

      {/* Place oder section ----------------------------------- */}
      <div className="flex gap-4">
        <button
          onClick={() => setSide('long')}
          className={`btn centered flex-1 rounded-lg py-2
            ${side === 'long' ? 'btn-green-gradient' : 'btn-down'}  `}
        >
          Long
        </button>
        <button
          onClick={() => setSide('short')}
          className={`centered btn flex-1 rounded-lg py-2
            ${side === 'short' ? 'btn-red-gradient' : 'btn-down'}`}
        >
          Short
        </button>
      </div>
      <div className="flex max-w-full flex-col">
        <AmountInput inputs={inputs} onChange={setInput} />
        <NumericInput
          className="bg-light-300 ocean:bg-ocean-600 text-light-500 placeholder:text-light-400  mt-4 h-[60px] w-full rounded-xl px-3 text-xl font-medium  "
          placeholder="0.00"
          value={inputs.size.toString()}
          onValueChange={({ value }, { source }) => {
            if (source === 'event') setInput({ value, type: 'size' })
          }}
        />
      </div>
      {price && (
        <span className="text-light-500 ocean:text-ocean-200 text-sm font-medium">
          Position size {format(inputs.size)} {market.asset}
        </span>
      )}
      <Fees sizeDelta={sizeDelta} />

      {/* Leverage handler ----------------------- */}
      <div className=" flex items-center justify-between px-4">
        <span className="text-light-400 ocean:text-ocean-300">{t('leverage')}</span>
        {[10, 25, 50].map((value) => (
          <button
            key={value}
            onClick={() => setLeverage(value.toString())}
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
            value={leverage || ''}
            onChange={handleInput}
          />
          {!!leverage && (
            <button onClick={() => setLeverage('0')} className="absolute left-3 ">
              <CloseIcon className="fill-ocean-300 h-3 w-3" />
            </button>
          )}
        </div>
      </div>
      <Slider max={50} step={0.1} onChange={handleInput} value={leverage || 0} />
      <button
        onClick={submitOrder}
        disabled={!submitOrder}
        className="btn btn-green-gradient centered h-16 rounded-lg text-xl opacity-50"
      >
        Place Order
      </button>
    </Panel>
  )
})
