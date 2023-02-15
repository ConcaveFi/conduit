import { useMemo, useState } from 'react'
import { DEFAULT_LAYOUT, getStoredLayout, storeLayout } from 'src/utils/gridLayout'

export interface GridLayoutHook {
  defaultLayout?: ReactGridLayout.Layout[]
}
export function useGridLayout(props?: GridLayoutHook) {
  const [layout, setLayout] = useState(props?.defaultLayout || getStoredLayout())
  const [maximizedPanel, setMaxPanel] = useState('')
  const [unMaximizedLayout, setUnMaximizedLayout] = useState(layout)
  const isMaximized = Boolean(maximizedPanel)

  function maximizePanel(key: string) {
    const panel = Object.assign<{}, ReactGridLayout.Layout>({}, { h: 1, x: 0, y: -1, w: 1, i: key })
    if (!panel) return
    // setUnMaximizedLayout(layout)
    setLayout([panel])
    setMaxPanel(key)
  }

  function minimize() {
    setLayout(unMaximizedLayout)
    setMaxPanel('')
  }

  function handleChange(layout: ReactGridLayout.Layout[]) {
    if (!isMaximized) {
      setUnMaximizedLayout(layout)
      storeLayout(layout)
    }
  }

  return {
    layout,
    isMaximized,
    maximizedPanel,
    maximize: maximizePanel,
    handleChange,
    minimize,
  }
}
