import { useMarketSettings, useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { useWatchOffchainPrice } from 'src/perpetuals/hooks/useOffchainPrice'
import { useNetwork } from 'wagmi'

import { FixedNumber } from 'ethers'
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

      const skewAdjustedPrice = price.mulUnsafe(
        market.marketSkew.divUnsafe(settings.skewScale).addUnsafe(FixedNumber.from(1)),
      )

      document.title = `${market.asset} - ${formatUsd(skewAdjustedPrice)} | Conduit`
    },
  })
}
