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
      for (let widget of widgets) {
        // If stored layout already has the current layout on it, we don't have to care about
        if (stored.find((wp) => wp.i === widget)) continue

        // When you remove some widgets but still remaining some, at localstorage will be stored only these widgets
        // if you go to another breakpoint, add the widgets that has been removed, and go back to the previus breakpoint
        // will be storedo only the 2 widget hasn't been removed before, so it's important make this verification
        // to check if stored layout is missing any widget propierties.
        const widgetProps = GridWidgetPresets.getWidgetPreset(widget, breakpoint)
        stored.push(widgetProps)
      }
      return setLayout(stored)
    }

    const displayPresets = GridWidgetPresets.getByBreakpoint(breakpoint)
    const filtered = displayPresets.filter((wp) => widgets.includes(wp.i))
    setLayout(filtered)
    return () => setLayout([])
  }, [breakpoint, widgets])

  const onAddWidgets = useCallback(
    (widgets: GridWidgets[]) => {
      if (!breakpoint || !layout) throw new Error('Ocurred an error adding a widget')
      const presets: Layout[] = []
      for (let widget of widgets) {
        // If for some reason the layout already has the added widget
        // We don't want to add it again with the purpose to avoid possible bugs
        const hasPreset = layout.find((wp) => wp.i === widget)
        if (hasPreset) continue

        const widgetPreset = GridWidgetPresets.getWidgetPreset(widget, breakpoint)
        presets.push(widgetPreset)
      }
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
