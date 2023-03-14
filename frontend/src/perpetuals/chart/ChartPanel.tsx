import { DivProps, Panel } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
// import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'
import { handleSynth } from 'src/utils/handleTokenLogo'
import { findValueOnUrl } from 'src/utils/urlHandler'
import { useScript } from 'usehooks-ts'
import { useRouteMarket } from '../hooks/useMarket'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const container_id = 'chart-container'
const DEFAULT_MARKET = 'ETH'
const SECOND_SYMBOL = 'USD'

export const ChartPanel = forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  // const [widget, setWidget] = useState<TVWidget>()
  // const [asset, setAsset] = useState('')
  const { t } = useTranslation()

  const market = useRouteMarket()
  const asset = market.asset

  const chartState = useScript(TRADING_VIEW_SRC)
  const chart = useRef<TVWidget>()

  useEffect(() => {
    if (!asset || chartState !== 'ready') return

    if (!chart.current) {
      const market = `BINANCE:${handleSynth(asset)}USD`
      chart.current = createTVwidget({ container_id, symbol: market })
    }

    return () => {
      chart.current?.iframe.remove()
    }
  }, [asset, chartState])

  return (
    <Panel
      name={t('chart')}
      variant="secondary"
      {...props}
      ref={ref}
      bodyProps={{ id: container_id, className: 'p-0' }}
    />
  )
})
