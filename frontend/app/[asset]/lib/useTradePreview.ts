import { useQuery } from '@tanstack/react-query'
import { Address, getContract, Provider, ReadContractResult } from '@wagmi/core'
import { SupportedChainId } from 'app/providers/WagmiProvider'
import { Dnum, from, toJSON } from 'dnum'
import { useAtomValue } from 'jotai'
import { marketAbi } from 'perps-hooks/abis'
import { market as marketContract } from 'perps-hooks/contracts'
import { valuesToBigInt } from 'perps-hooks/parsers'
import { toBigNumber } from 'utils/toBigNumber'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { sizeDeltaAtom } from '../components/order-form/OrderFormPanel'
import { routeMarketAtom } from './market/useMarket'

const parseTradePreview = ({
  fee,
  liqPrice,
  price,
  margin,
  size,
}: ReadContractResult<typeof marketAbi, 'postTradeDetails'>) => {
  const d = valuesToBigInt({ fee, liqPrice, price, margin, size })
  return {
    fee: from([d.fee, 18]),
    entryPrice: from([d.price, 18]),
    liquidationPrice: from([d.liqPrice, 18]),
  }
}
export type TradePreview = ReturnType<typeof parseTradePreview>

const OrderType = {
  atomic: 0,
  delayed: 1,
  delayedOffchain: 2,
}

async function fetchTradePreview(
  market: Address,
  sizeDelta: Dnum,
  marketPrice: Dnum,
  account: Address,
  provider: Provider,
) {
  const result = await getContract({
    address: market,
    abi: marketContract.abi,
    signerOrProvider: provider,
  }).postTradeDetails(
    toBigNumber(sizeDelta),
    toBigNumber(marketPrice),
    OrderType.delayedOffchain,
    account,
  )
  return parseTradePreview(result) as TradePreview
}
const tradePreviewQueryKey = (
  market?: Address,
  sizeDelta?: Dnum,
  marketPrice?: Dnum,
  account?: Address,
) => [
  'trade preview',
  {
    market,
    sizeDelta: sizeDelta && toJSON(sizeDelta),
    marketPrice: marketPrice && toJSON(marketPrice),
    account,
    orderType: OrderType.delayedOffchain,
  },
]

export function useTradePreview<TSelect = TradePreview>({
  sizeDelta,
  marketPrice,
  market,
  select,
}: {
  market?: Address
  sizeDelta?: Dnum
  marketPrice?: Dnum
  select?: (t: TradePreview) => TSelect
}) {
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const chainId = !chain || chain.unsupported ? optimism.id : (chain.id as SupportedChainId)

  const provider = useProvider({ chainId })

  const enabled = Boolean(account && market && marketPrice && sizeDelta)

  return useQuery(
    tradePreviewQueryKey(market, sizeDelta, marketPrice, account),
    () => fetchTradePreview(market!, sizeDelta!, marketPrice!, account!, provider),
    {
      select,
      enabled,
      keepPreviousData: true,
    },
  )
}

export function useCurrentTradePreview<TSelect = TradePreview>(
  select?: (t: TradePreview) => TSelect,
) {
  const sizeDelta = useAtomValue(sizeDeltaAtom.debouncedValueAtom)
  const { data: market } = useAtomValue(routeMarketAtom)
  return useTradePreview({
    sizeDelta,
    marketPrice: [0n, 0], // marketPrice updates like every second, do we want to refetch this often?
    market: market?.address,
    select,
  })
}

// const routeMarketSettingsAtom = atom({
//   skewScale: 0,
//   liquidationPremiumMultiplier: 0,
//   liquidationFeeRatio: 0,
//   liquidationBufferRatio: 0,
//   maxKeeperFee: 0,
//   minKeeperFee: 0,
// })

// const liquidationPriceAtom = atom((get) => {
//   const currentPrice = get(routeMarketIndexPriceAtom)
//   const positionSize = get(selectAtom(orderDerivedValuesAtom, ({ asset }) => asset))
//   const notional = get(orderSizeUsdAtom)

//   const {
//     skewScale,
//     liquidationPremiumMultiplier,
//     liquidationBufferRatio,
//     liquidationFeeRatio,
//     maxKeeperFee,
//     minKeeperFee,
//   } = get(routeMarketSettingsAtom)

//   function _liquidationPremium(positionSize, currentPrice) {
//     // note: this is the same as fillPrice() where the skew is 0.
//     // const notional = _abs(_notionalValue(positionSize, currentPrice))

//     return multiply(
//       multiply(divide(positionSize, skewScale), notional),
//       liquidationPremiumMultiplier,
//     )
//     // .divideDecimal(_skewScale(_marketKey()))
//     // .multiplyDecimal(notional)
//     // .multiplyDecimal(_liquidationPremiumMultiplier(_marketKey()))
//   }

//   function _liquidationFee(positionSize, price) {
//     // size * price * fee-ratio
//     const proportionalFee = multiply(multiply(positionSize, price), liquidationFeeRatio)
//     const cappedProportionalFee = greaterThan(proportionalFee, maxKeeperFee) ? maxKeeperFee : proportionalFee

//     return greaterThan(cappedProportionalFee, minKeeperFee) ? cappedProportionalFee : minKeeperFee // not using _max() helper because it's for signed ints
//   }

//   function _liquidationMargin(positionSize, price) {
//     const liquidationBuffer = multiply(multiply(positionSize, price), liquidationBufferRatio)
//     return add(liquidationBuffer, _liquidationFee(positionSize, price))
//   }

//   function _currentFundingRate() internal view returns (int) {
//     return
//         int(marketState.fundingRateLastRecomputed()).add(
//             _currentFundingVelocity().multiplyDecimal(_proportionalElapsed())
//         );
// }

// function _unrecordedFunding(uint price) internal view returns (int) {
//     int nextFundingRate = _currentFundingRate();
//     // note the minus sign: funding flows in the opposite direction to the skew.
//     int avgFundingRate = -(int(marketState.fundingRateLastRecomputed()).add(nextFundingRate)).divideDecimal(_UNIT * 2);
//     return avgFundingRate.multiplyDecimal(_proportionalElapsed()).multiplyDecimal(int(price));
// }

//   function _nextFundingEntry(uint price) internal view returns (int) {
//     return marketState.fundingSequence(_latestFundingIndex()).add(_unrecordedFunding(price));
// }

// function _netFundingPerUnit(uint startIndex, uint price) internal view returns (int) {
//     // Compute the net difference between start and end indices.
//     return _nextFundingEntry(price).sub(marketState.fundingSequence(startIndex));
// }

//   const liquidationPrice = (position, currentPrice) => {
//     position.lastPrice
//       .add(_liquidationMargin(position.size, currentPrice))
//       .sub(position.margin.sub(_liquidationPremium(position.size, currentPrice)))
//       .divideDecimal(position.size)
//       .sub(_netFundingPerUnit(position.lastFundingIndex, currentPrice))
//     // If the user has leverage less than 1, their liquidation price may actually be negative; return 0 instead.
//     // return uint(_max(0, result));
//   }
// })
