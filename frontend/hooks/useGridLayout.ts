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
  const { events } = useWidgets()

  useEffect(() => {
    if (breakpoint === undefined) return

    const stored = GridLayout.getStoredlayout(breakpoint)
    if (stored !== undefined) return setLayout(stored)

    setLayout(GridWidgetPresets.getByBreakpoint(breakpoint))
  }, [breakpoint])

  console.log(layout)
  const onAddWidgets = useCallback(
    (widgets: GridWidgets[]) => {
      if (!breakpoint || !layout) throw new Error('Ocurred an error adding a widget')
      const presets: Layout[] = []
      for (let widget of widgets) {
        // If for some reason the layout already has the added widget
        // We don't want to add it again with the porpuse to avoid possible bugs
        const hasPreset = layout.find((wp) => wp.i === widget)
        if (hasPreset) continue

        const widgetPreset = GridWidgetPresets.getWidgetPreset(widget, breakpoint)
        presets.push(widgetPreset)
      }
      if (presets.length > 0) setLayout([...layout, ...presets])
    },
    [breakpoint, layout],
  )

  // it's important removing the widget props from the layout even if this means do another mount
  // because this can generate some problems when you try to add them again with their respective presets
  const onRemoveWidget = useCallback(
    (widget: GridWidgets) => {
      if (!breakpoint || !layout) throw new Error('Ocurred an error removing a widget')
      const newLayout = layout.filter((wp) => wp.i !== widget)
      setLayout(newLayout)
    },
    [layout, breakpoint],
  )

  useEffect(() => {
    events.current.on('add', onAddWidgets)
    events.current.on('remove', onRemoveWidget)
    return () => {
      events.current.off('add', onAddWidgets)
      events.current.off('remove', onRemoveWidget)
    }
  }, [onAddWidgets])

  const handleChange = useCallback(
    function storeLayout(_layout: Layout[]) {
      if (!breakpoint) return
      GridLayout.storeLayout(_layout, breakpoint)
    },
    [breakpoint],
  )

  return {
    layout,
    handleChange,
  }
}
