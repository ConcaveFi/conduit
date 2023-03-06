import { FixedNumber } from 'ethers'
import { useMarketSettings, useRouteMarket } from 'src/hooks/perps'
import { useWatchOffchainPrice } from 'src/hooks/usePrice'
import { useNetwork } from 'wagmi'

import { Markets } from 'perps-hooks/markets'
import { formatUsd } from 'src/utils/format'

export function usePageTitleWithAssetPrice() {
  const market = useRouteMarket()
  const { data: settings } = useMarketSettings({ marketKey: market?.key })

  const { chain } = useNetwork()
  const pythNetwork = chain?.testnet ? 'testnet' : 'mainnet'
  const marketPythId = market?.key && Markets[market.key].pythIds[pythNetwork]

  useWatchOffchainPrice({
    pythId: marketPythId,
    enabled: !!market,
    network: pythNetwork,
    onPriceChange({ price }) {
      if (!market || !settings) return

      const skew = FixedNumber.fromValue(market.marketSkew.div(settings.skewScale).add(1))
      const skewAdjustedPrice = price.mulUnsafe(skew)

      document.title = `${market.asset} - ${formatUsd(skewAdjustedPrice)} | Conduit`
    },
  })
}
