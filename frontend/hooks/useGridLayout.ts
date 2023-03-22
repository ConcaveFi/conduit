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
      if (!breakpoint || !layout) throw new Error('Ocurred an error trying to add a widget')
      const newLayout = layout.map((widgetProps) => {
        if (!widgets.includes(widgetProps.i)) return widgetProps
        const widget = widgetProps.i as GridWidgets
        const widgetPreset = GridWidgetPresets.getWidgetPreset(widget, breakpoint)
        console.log(widgetPreset)

        return widgetPreset
      })
      setLayout(newLayout)
    },
    [breakpoint, layout],
  )

  useEffect(() => {
    events.current.on('add', onAddWidgets)
    return () => events.current.off('add', onAddWidgets)
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
