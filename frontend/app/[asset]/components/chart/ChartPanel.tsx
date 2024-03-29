import { Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef, useEffect, useRef } from 'react'
import { useScript } from 'usehooks-ts'
import { createTVwidget } from 'utils/createTVwidget'
import { handleSynth } from 'utils/handleTokenLogo'
import { useRouteMarket } from '../../lib/market/useMarket'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const container_id = 'chart-container'
const DEFAULT_MARKET = 'ETH'
const SECOND_SYMBOL = 'USD'

export const ChartPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  // const [widget, setWidget] = useState<TVWidget>()
  // const [asset, setAsset] = useState('')
  const { t } = useTranslation()

  const market = useRouteMarket()
  const asset = market?.asset

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
      chart.current = undefined
    }
  }, [asset, chartState])

  return (
    <Panel
      name={t('chart')}
      variant="secondary"
      {...props}
      ref={ref}
      bodyProps={{ className: 'p-0 group' }}
    >
      <div id={container_id} className="h-full w-full"></div>
      {props.children}
    </Panel>
  )
})
