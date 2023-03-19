import { useQuery } from '@tanstack/react-query'
import { cx, NumericInput, Panel, PanelProps, Skeleton } from '@tradex/interface'
import * as Slider from '@tradex/interface/components/primitives/Slider'
import { useTranslation } from '@tradex/languages'
import { Address, getContract, Provider } from '@wagmi/core'
import { SupportedChainId } from 'app/providers/wagmi-config'
import { MAX_LEVERAGE } from 'app/[asset]/constants/perps-config'
import { useMarketSettings, useRouteMarket } from 'app/[asset]/lib/market/useMarket'
import { MarketKey } from 'app/[asset]/lib/price/pyth'
import { divide, equal, from, greaterThan, multiply, subtract, toNumber } from 'dnum'
import { formatBytes32String } from 'ethers/lib/utils.js'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { marketData } from 'perps-hooks/contracts'
import { parsePositionDetails } from 'perps-hooks/parsers'
import { forwardRef, useCallback, useEffect, useReducer } from 'react'
import atomWithDebounce from 'utils/atom-utils'
import { useQueryModal } from 'utils/enum/urlModal'
import { format, safeStringDnum } from 'utils/format'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { routeMarketPriceAtom } from '../../lib/price/useOffchainPrice'
import { TransferMarginButton } from './TransferMargin'

function SideSelector() {
  const { t } = useTranslation()
  const [side, setSide] = useAtom(sideAtom)
  return (
    <div className="flex gap-4 font-mono">
      <button
        aria-selected={side === 'long'}
        onClick={() => setSide('long')}
        className={cx(
          `btn centered flex-1 rounded-lg py-2 text-white  `,
          'aria-selected:bg-dark-green-gradient ocean:aria-selected:bg-blue-green-gradient aria-selected:border-transparent',
          'aria-diselected:text-teal-400 aria-diselected:ring-1 ring-inset ring-teal-400',
        )}
      >
        {t('long')}
      </button>
      <button
        aria-selected={side === 'short'}
        onClick={() => setSide('short')}
        className={cx(
          `btn centered flex-1 rounded-lg py-2 text-white `,
          'aria-selected:bg-dark-red-gradient ocean:aria-selected:bg-blue-red-gradient aria-selected:border-transparent',
          'aria-diselected:text-red-400 aria-diselected:ring-1 ring-inset ring-red-400',
        )}
      >
        {t('short')}
      </button>
    </div>
  )
}

const OrderSizeInput = () => {
  const routeMarket = useRouteMarket()

  const [amountDenominator, toggleAmountDenominator] = useReducer(
    (s) => (s === 'usd' ? 'asset' : 'usd'),
    'usd',
  )
  const other = amountDenominator === 'usd' ? 'asset' : 'usd'
  const symbols = { usd: 'sUSD', asset: routeMarket.asset }

  const onChange = useSetAtom(orderInputAtom)
  const inputs = useAtomValue(orderDerivedValuesAtom)
  const value = inputs[amountDenominator]

  const { data: isOverBuyingPower } = useMarginDetails(
    ({ buyingPower }) => !!inputs.usd && greaterThan(inputs.usd, buyingPower),
  )

  const hasValue = greaterThan(inputs[other] || 0, 0)

  return (
    <motion.div className="bg-dark-main-bg ocean:bg-blue-main-bg flex max-h-20 w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <span className="ocean:text-ocean-200 text-xs text-white">Order Size</span>
      <div className="flex w-full max-w-full justify-between">
        <div className="flex min-w-0 flex-col">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`order-size-${amountDenominator}`}
              layout="position"
              layoutId={`order-size-${amountDenominator}`}
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              exit={{ y: -4, opacity: 0 }}
              transition={{ layout: { ease: 'backOut' } }}
            >
              <NumericInput
                data-overflow={isOverBuyingPower}
                variant={'none'}
                className=" placeholder:ocean:text-ocean-200 placeholder:text-silver min-w-0 overflow-ellipsis bg-transparent font-mono text-xl text-white outline-none data-[overflow=true]:text-red-400"
                placeholder="0.00"
                value={value ? format(value, { trailingZeros: false }) : ''}
                onValueChange={({ value }, { source }) => {
                  if (source === 'event') onChange({ value, type: amountDenominator })
                }}
              />
            </motion.div>

            {isOverBuyingPower ? (
              <motion.span
                key="order-size-error"
                layout
                initial={{ opacity: 0, y: -4, height: inputs[other] ? 'auto' : 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="font-mono text-xs text-red-400"
              >
                Over your buying power
              </motion.span>
            ) : (
              hasValue && (
                <motion.button
                  key={`order-size-${other}`}
                  layout
                  layoutId={`order-size-${other}`}
                  onClick={toggleAmountDenominator}
                  initial={{ opacity: 0, y: -8, height: inputs[other] ? 'auto' : 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ layout: { ease: 'backOut' } }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    height: isOverBuyingPower ? 'auto' : 0,
                  }}
                  className=" text-ocean-200 min-h-0 max-w-full text-ellipsis text-start font-mono text-xs outline-none hover:text-white"
                >
                  <span className="text-ellipsis font-medium">{format(inputs[other], 9)}</span>
                  <span className="ml-0.5 text-inherit">{symbols[other]}</span>
                </motion.button>
              )
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={toggleAmountDenominator}
          className="hover:bg-ocean-500 -mx-2 mb-auto rounded-xl px-2 py-1 text-sm font-medium text-white"
        >
          {symbols[amountDenominator]}
        </button>
      </div>
    </motion.div>
  )
}

const useInterpolateLiquidationRiskColor = (value: number, max: number) => {
  const v = useMotionValue(value)
  useEffect(() => v.set(value), [value, v])
  return useTransform(v, [max, max / 2, 0], ['#f87171', '#facc15', '#4ade80'])
}

function SizeSlider({
  value,
  max,
  onChange,
  disabled,
}: {
  value: number
  max: number
  onChange: (s: InputState) => void
  disabled: boolean
}) {
  const handleSizeSlider = useCallback(
    (v: number[]) => {
      const value = v[0]
      if (!max) return
      if (value === 0) return onChange({ value: '', type: 'usd' })
      onChange({ value: value.toString(), type: 'usd' })
    },
    [max, onChange],
  )

  const borderColor = useInterpolateLiquidationRiskColor(value, max)

  return (
    <Slider.Root
      disabled={!max || disabled}
      value={[value > max ? max : value]}
      step={0.5}
      max={max}
      onValueChange={handleSizeSlider}
      className="relative flex w-full touch-none select-none items-center"
    >
      <Slider.Track
        aria-disabled={disabled}
        className={cx(
          'h-1 flex-1 rounded-full',
          'aria-enabled:bg-gradient-to-r from-green-400 via-yellow-400 to-red-400',
          'aria-disabled:bg-dark-20 ocean:aria-disabled:bg-blue-20',
        )}
      />
      <Slider.Thumb asChild>
        <motion.span
          aria-disabled={disabled}
          className={cx(
            'box-4 bg-dark-20 ocean:bg-blue-20 block rounded-full border-2 outline-none ',
            'transition-all duration-300 ease-out will-change-transform focus:transition-none',
            'aria-disabled:border-dark-30 ocean:aria-disabled:border-blue-30',
          )}
          style={{ borderColor: disabled ? '' : borderColor }}
        />
      </Slider.Thumb>
    </Slider.Root>
  )
}
// rgb(62 83 137)

const riskLevelLabel = (value: number, max: number) => {
  // if (!value || value < remainingMargin) return 'NONE'
  if (value <= max * 0.25) return 'LOW'
  if (value <= max * 0.75) return 'MEDIUM'
  return 'HIGH'
}

function LiquidationSlider() {
  const { data: buyingPower = 0 } = useMarginDetails((details) => toNumber(details.buyingPower, 2))

  const sizeUsd = useAtomValue(orderSizeUsdAtom)

  const onChange = useSetAtom(orderInputAtom)

  return (
    <>
      <SizeSlider value={sizeUsd} max={buyingPower} onChange={onChange} disabled={!buyingPower} />
      <div className="flex justify-between font-mono">
        <span
          className={cx(
            'text-xs',
            buyingPower ? 'text-green-500' : 'text-dark-30 ocean:text-blue-30',
          )}
        >
          $0
        </span>
        {!!buyingPower && <span className="text-xs text-orange-500">$ {format(buyingPower)}</span>}
      </div>
    </>
  )
}

function LiquidationPriceRisk() {
  const { data: buyingPower = 0 } = useMarginDetails((details) => toNumber(details.buyingPower, 2))

  const sizeUsd = useAtomValue(orderSizeUsdAtom)

  const color = useInterpolateLiquidationRiskColor(sizeUsd, buyingPower)
  const riskLabel = riskLevelLabel(sizeUsd, buyingPower)

  const isLoading = false

  return (
    <>
      {sizeUsd > 0 && isLoading ? (
        <Skeleton className="mb-1 h-5 w-24" />
      ) : (
        <span className="min-w-0 overflow-ellipsis font-mono text-xl text-white outline-none">
          ${0}
        </span>
      )}
      <motion.span style={{ color }} className="font-bold">
        {riskLabel}
      </motion.span>
    </>
  )
}

function LiquidationPrice() {
  return (
    <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex w-full max-w-full flex-col gap-1 rounded-lg px-3 py-2 transition-all">
      <div className="flex justify-between">
        <span className="ocean:text-blue-accent text-dark-accent text-xs">Liquidation Price:</span>
        <span className="ocean:text-blue-accent text-dark-accent text-xs">Risk Level</span>
      </div>
      <div className="flex flex-col gap-2 font-mono">
        <div className="flex h-7 items-center justify-between">
          <LiquidationPriceRisk />
        </div>
        <LiquidationSlider />
      </div>
    </div>
  )
}

const fetchMarginDetails = async (
  account: Address | undefined,
  chainId: SupportedChainId,
  provider: Provider,
  marketKey: MarketKey,
) => {
  if (!account) throw 'not connected'
  const position = await getContract({
    address: marketData.address[chainId],
    abi: marketData.abi,
    signerOrProvider: provider,
  }).positionDetailsForMarketKey(formatBytes32String(marketKey), account)
  const details = parsePositionDetails(position)
  const buyingPower = multiply(details.remainingMargin, MAX_LEVERAGE)
  return {
    buyingPower,
    available: subtract(buyingPower, details.notionalValue),
    notionalValue: details.notionalValue,
    remainingMargin: details.remainingMargin,
  }
}
type MarginDetails = Awaited<ReturnType<typeof fetchMarginDetails>>
function useMarginDetails<TSelect = MarginDetails>(select?: (m: MarginDetails) => TSelect) {
  const { chain } = useNetwork()
  const chainId = !chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId)

  const market = useRouteMarket()
  const { address: account } = useAccount()

  const provider = useProvider({ chainId })
  return useQuery(
    ['market position details', market.key, account, chainId],
    () => fetchMarginDetails(account, chainId, provider, market.key),
    { select, enabled: !!account },
  )
}

function MarginDetails() {
  const { data: details, isLoading } = useMarginDetails()
  const { notionalValue, remainingMargin, available, buyingPower } = details || {}

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="bg-dark-30 ocean:bg-blue-30 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-dark-accent ocean:text-blue-accent">Deposited</span>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-white">$ {format(remainingMargin)}</span>
          )}
        </div>
        <div className="bg-dark-30 ocean:bg-blue-30 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-dark-accent ocean:text-blue-accent">Buying power</span>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-green-400">$ {format(buyingPower)}</span>
          )}
        </div>
        <div className="bg-dark-30 ocean:bg-blue-30 flex flex-col gap-1 rounded-lg p-2 text-xs">
          <span className="text-dark-accent ocean:text-blue-accent">In position</span>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span className="font-mono text-red-400">$ {format(notionalValue)}</span>
          )}
        </div>
      </div>
      <div className="bg-dark-30 ocean:bg-blue-30 flex justify-between rounded-lg p-3 text-sm">
        <span className="text-dark-accent ocean:text-blue-accent">Available</span>
        {isLoading ? (
          <Skeleton />
        ) : (
          <span className="font-mono text-white">$ {format(available)}</span>
        )}
      </div>
    </div>
  )
}

function ExecutionFee({ marketKey }: { marketKey: MarketKey | undefined }) {
  const { data: executionFee } = useMarketSettings({
    marketKey,
    select: (settings) => settings.minKeeperFee,
  })
  return (
    <li className="flex w-full justify-between px-2 py-0.5">
      <span>Execution Fee:</span>
      {executionFee && <span>$ {format(executionFee)}</span>}
    </li>
  )
}

function TradeDetails() {
  const market = useRouteMarket()
  return (
    <ul className="text-ocean-200 text-xs">
      <li className="bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
        <span>Entry price:</span>
        {/* {entryPrice && <span>$ {format(entryPrice)}</span>} */}
      </li>
      <ExecutionFee marketKey={market.key} />
      <li className="bg-ocean-400 flex w-full justify-between rounded px-2 py-0.5">
        <span>Trade Fee: </span>
        {/* {fee && <span>$ {format(fee)}</span>} */}
      </li>
    </ul>
  )
}

// function ConfirmOrderModal() {
//   const market = useRouteMarket()
//   const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)

//   const { config } = usePrepareMarketSubmitOffchainDelayedOrderWithTracking({
//     address: market.address,
//     enabled: !equal(sizeDelta, 0) && !isOverBuyingPower,
//     args: [toBigNumber(sizeDelta), toBigNumber(DEFAULT_PRICE_IMPACT_DELTA), TrackingCode],
//   })
//   const { write: submitOrder } = useMarketSubmitOffchainDelayedOrderWithTracking(config)

//   return
// }

function usePlaceOrderButton() {
  const inputs = useAtomValue(orderDerivedValuesAtom)

  const { data: isOverBuyingPower } = useMarginDetails(
    ({ buyingPower }) => !!inputs.usd && greaterThan(inputs.usd, buyingPower),
  )

  const side = useAtomValue(sideAtom)

  let label = `Place ${side}`
  if (!inputs.usd || equal(inputs.usd, 0)) label = 'Enter an amount'
  if (isOverBuyingPower) label = 'Not enough margin'

  return {
    disabled: !inputs.usd || equal(inputs.usd, 0) || isOverBuyingPower,
    children: label,
  }
}
function PlaceOrderButton() {
  const props = usePlaceOrderButton()
  return (
    <>
      <button
        className={cx(
          'btn centered bg-dark-green-gradient ocean:bg-blue-green-gradient',
          'h-11 rounded-lg font-bold  text-white shadow-lg disabled:opacity-60',
        )}
        {...props}
      />
      {/* <ConfirmOrderModal /> */}
    </>
  )
}

function DepositMarginToReduceRisk() {
  const { onOpen } = useQueryModal({ modalType: 'margin', type: 'transfer' })
  return (
    <div className="flex items-center justify-between">
      <span className="ocean:text-blue-accent text-dark-accent text-xs">
        Increase margin to reduce risk
      </span>
      <button
        onClick={onOpen}
        className="text-dark-accent ocean:text-blue-accent border-coal ocean:border-blue-accent  rounded-md border px-3 py-0.5 text-xs"
      >
        Deposit Margin
      </button>
    </div>
  )
}

type InputState = { value: string; type: 'usd' | 'asset' }

const sideAtom = atom<'long' | 'short'>('long')
const orderInputAtom = atom<InputState>({ value: '', type: 'usd' })
const orderDerivedValuesAtom = atom((get) => {
  const { value, type } = get(orderInputAtom)
  if (!value) return { usd: '', asset: '' } as const

  const price = get(routeMarketPriceAtom)

  const amount = safeStringDnum(value)
  if (!price || equal(price, 0)) return { usd: '', asset: '', [type]: amount } as const
  return {
    usd: () => ({ usd: amount, asset: divide(amount, price, 18) }),
    asset: () => ({ usd: multiply(amount, price, 18), asset: amount }),
  }[type]()
})
const orderSizeUsdAtom = selectAtom(orderDerivedValuesAtom, ({ usd }) =>
  toNumber(usd || [0n, 0], 2),
)

const sizeDeltaAtom = atomWithDebounce((get) => {
  const side = get(sideAtom)
  const assetInput = get(orderDerivedValuesAtom).asset
  if (!assetInput) return from([0n, 0])
  return from(side === 'long' ? assetInput : multiply(assetInput, -1))
}, 150)

export const OrderFormPanel = forwardRef<HTMLDivElement, PanelProps>(function OrderFormPanel(
  props,
  ref,
) {
  return (
    <Panel
      ref={ref}
      name="Order Form"
      bodyProps={{ className: 'p-3 md:overflow-y-scroll overflow-x-hidden' }}
      {...props}
    >
      <TransferMarginButton />
      <MarginDetails />

      <SideSelector />
      <OrderSizeInput />
      <LiquidationPrice />

      <DepositMarginToReduceRisk />

      <PlaceOrderButton />

      {/* <TradeDetails
        marketKey={market?.key}
        fee={tradePreview.data?.fee}
        entryPrice={tradePreview.data?.entryPrice}
      /> */}
    </Panel>
  )
})
