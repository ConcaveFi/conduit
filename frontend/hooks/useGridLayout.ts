import { useWidgets } from 'app/providers/WidgetsProvider'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { Layout } from 'react-grid-layout'
import { breakpointAtom } from 'utils/contants/breakpoints'
import { GridLayout } from 'utils/grid/grid.layout'
import { GridWidgets } from 'utils/grid/grid.widgets'
import { GridWidgetPresets } from 'utils/grid/widgets.presets'

export interface GridLayoutHook {
  defaultLayout?: Layout[]
}
export function useGridLayout(props?: GridLayoutHook) {
  const breakpoint = useAtomValue(breakpointAtom)
  const [layout, setLayout] = useState(props?.defaultLayout)
  const { events, widgets } = useWidgets()

  useEffect(() => {
    if (typeof breakpoint === 'undefined') return

    let stored = GridLayout.getStoredlayout(breakpoint)
    if (typeof stored !== 'undefined') {
      stored = stored.filter((wp) => widgets.includes(wp.i)) // remove widget config if widget is not added to DOM
      const missingPresets = widgets
        .filter((widget) => !stored?.some((wp) => wp.i === widget))
        .map((widget) => GridWidgetPresets.getWidgetPreset(widget, breakpoint))

      return setLayout([...stored, ...missingPresets])
    }

    const displayPresets = GridWidgetPresets.getByBreakpoint(breakpoint)
    const filtered = displayPresets.filter((wp) => widgets.includes(wp.i))
    setLayout(filtered)
  }, [breakpoint, widgets])

  const onAddWidgets = useCallback(
    (widgets: GridWidgets[]) => {
      if (!breakpoint || !layout) throw new Error('Ocurred an error adding a widget')
      const presets = widgets
        .filter((widget) => !layout.some((wp) => wp.i === widget))
        .map((w) => GridWidgetPresets.getWidgetPreset(w, breakpoint))
      if (presets.length > 0) setLayout([...layout, ...presets])
    },
    [breakpoint, layout],
  )

  useEffect(() => {
    events.current.on('add', onAddWidgets)
    return () => events.current.off('add', onAddWidgets)
  }, [onAddWidgets])

  const handleChange = useCallback(
    (_layout: Layout[]) => {
      if (!breakpoint) return
      GridLayout.storeLayout(_layout, breakpoint)
    },
    [breakpoint, layout],
  )

  return {
    layout,
    handleChange,
  }
}
