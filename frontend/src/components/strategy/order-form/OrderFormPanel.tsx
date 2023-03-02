import { Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { BigNumber, FixedNumber } from 'ethers'
import {
  useMarketRemainingMargin,
  useMarketSubmitOffchainDelayedOrderWithTracking,
  usePrepareMarketSubmitOffchainDelayedOrderWithTracking,
} from 'perps-hooks'
import { ChangeEvent, forwardRef, useCallback, useMemo, useState } from 'react'
import {
  AmountInput,
  DEFAULT_PRICE_IMPACT_DELTA,
  deriveInputs,
  InputState,
  MAX_LEVERAGE,
  TrackingCode,
  useRouteMarket,
} from 'src/pages/perps'
import { formatUsd, safeFixedNumber } from 'src/utils/format'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import { TransferMarginButton } from './TransferMargin'

function SideSelector({
  side,
  onChange,
}: {
  side: 'long' | 'short'
  onChange: (side: 'long' | 'short') => void
}) {
  const { t } = useTranslation()
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange('long')}
        className={`btn centered flex-1 rounded-lg py-2 ${
          side === 'long' ? 'btn-green-gradient' : 'btn-down'
        }`}
      >
        {t('long')}
      </button>
      <button
        onClick={() => onChange('short')}
        className={`centered btn flex-1 rounded-lg py-2 ${
          side === 'short' ? 'btn-red-gradient' : 'btn-down'
        }`}
      >
        {t('short')}
      </button>
    </div>
  )
}

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()

  const [leverage, setLeverage] = useState(MAX_LEVERAGE.toString())
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (+value >= MAX_LEVERAGE.toUnsafeFloat()) value = MAX_LEVERAGE.toString()
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

  const debouncedSize = useDebounce(inputs.size, 150)
  const sizeDelta = useMemo(() => {
    const size = BigNumber.from(debouncedSize || 0)
    return side === 'long' ? size : size.mul(-1)
  }, [debouncedSize, side, price])

  const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
    address: market && market.address,
    enabled: !sizeDelta.isZero(),
    args: [sizeDelta, DEFAULT_PRICE_IMPACT_DELTA, TrackingCode],
  })
  const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

  const handleSizeSlider = useCallback(() => {}, [])

  const { address } = useAccount()
  const { data: remainingMargin } = useMarketRemainingMargin({
    address: market && market.market,
    args: address && [address],
    select: (d) => FixedNumber.fromValue(d.marginRemaining, 18),
  })

  if (!market) return null

  return (
    <>
      <Panel ref={ref} name="Order Form" className="w-3/12 " {...props}>
        <TransferMarginButton />

        {remainingMargin && <span>Margin Available: {formatUsd(remainingMargin)}</span>}
        <div className="flex max-w-full flex-col">
          <AmountInput inputs={inputs} onChange={setInput} />
        </div>

        <SideSelector side={side} onChange={setSide} />
        {/* <Fees sizeDelta={sizeDelta} /> */}

        {/* Leverage handler ----------------------- */}
        {/* <div className=" flex items-center justify-between px-4">
          <span className="text-light-400 ocean:text-ocean-300">{t('leverage')}</span>
          {[10, 17.5, 25].map((value) => (
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
              max={25}
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
        <Slider.Root
          value={[0]}
          step={0.1}
          max={100}
          onValueChange={(v) => handleSizeSlider(v)}
          className="relative flex h-[20px] w-full touch-none select-none items-center"
        >
          <Slider.Track className=" bg-light-300 ocean:bg-ocean-600 relative h-[3px] flex-1 rounded-full ">
            <Slider.Range className="bg-light-500 ocean:bg-green-gradient absolute h-full rounded-full" />
          </Slider.Track>
          <Slider.Thumb className="box-[15px] bg-light-500 ocean:bg-white block rounded-full transition-all duration-300 ease-out hover:scale-125" />
        </Slider.Root> */}

        <button
          onClick={submitOrder}
          disabled={!submitOrder}
          className="btn btn-green-gradient centered h-16 rounded-lg text-xl opacity-50"
        >
          {t('place order')}
        </button>
      </Panel>
    </>
  )
})
