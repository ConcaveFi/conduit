import { Panel } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { useRouter } from 'next/router'
import { forwardRef, useEffect, useState } from 'react'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const SCRIPT_TYPE = 'text/javascript'

export const ChartPanel = forwardRef<HTMLDivElement, PrimitiveDivProps>((props, ref) => {
  const [widget, setWidget] = useState<TVWidget>()
  const [asset, setAsset] = useState('ETH')
  const router = useRouter()
  const id = 'chart-container'

  useEffect(() => {
    function handleChange(e: string) {
      const query = 'asset'
      const index = e.indexOf(query)
      e = e.substring(index + query.length + 1)
      const nextQuery = e.indexOf('&')
      e = e.substring(0, nextQuery)
      if (e) setAsset(e)
    }
    router.events.on('routeChangeComplete', handleChange)
    return () => router.events.off('routeChangeComplete', handleChange)
  }, [])

  useEffect(() => {
    if (router.query.asset) setAsset(router.query.asset as string)
  }, [router.isReady])

  const loadChart = () => setWidget(createTVwidget({ container_id: id }))
  useScriptLoader(TRADING_VIEW_SRC, SCRIPT_TYPE, loadChart)

  return <Panel name="Chart" variant="secondary" {...props} ref={ref} bodyProps={{ id }} />
})
