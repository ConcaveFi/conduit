import { DivProps, Panel } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef, useEffect, useState } from 'react'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'
import { handleSynth } from 'src/utils/handleTokenLogo'
import { findValueOnUrl } from 'src/utils/urlHandler'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const container_id = 'chart-container'
const DEFAULT_MARKET = 'ETH'
const SECOND_SYMBOL = 'USD'

export const ChartPanel = forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  const [widget, setWidget] = useState<TVWidget>()
  const [asset, setAsset] = useState('')
  const { t } = useTranslation()

  const loadChart = () => setWidget(createTVwidget({ container_id, symbol: asset + SECOND_SYMBOL }))
  const onRouteChange = (e: string) => setAsset(handleSynth(findValueOnUrl(e, 'asset')))
  const onIsReady = ({ query }) => setAsset(handleSynth(query.asset as string) || DEFAULT_MARKET)

  const { router } = useRouterEvents({ routeComplete: onRouteChange, onIsReady })
  const { loaded } = useScriptLoader({ onLoad: loadChart, src: TRADING_VIEW_SRC, enabled: !!asset })

  useEffect(() => {
    if (!asset || !loaded) return
    if (widget) widget.iframe.remove()
    loadChart()
    return () => widget?.iframe.remove()
  }, [asset, loaded])

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
