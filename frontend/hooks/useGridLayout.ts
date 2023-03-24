import { useWidgets } from 'app/providers/WidgetsProvider'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'
import { Layout } from 'react-grid-layout'
import { breakpointAtom } from 'utils/contants/breakpoints'
import { GridLayout } from 'utils/grid/grid.layout'
import { GridWidgetPresets } from 'utils/grid/widgets.presets'

export interface GridLayoutHook {
  defaultLayout?: Layout[]
}
export function useGridLayout(props?: GridLayoutHook) {
  const breakpoint = useAtomValue(breakpointAtom)
  const { widgets } = useWidgets()

  const layout = useMemo(() => {
    if (!breakpoint) return null
    const stored = GridLayout.getStoredlayout(breakpoint)
    const defaultLayout = GridWidgetPresets.getByBreakpoint(breakpoint)
    let layout = stored || defaultLayout

    const hasMissingWidgets = widgets.length > layout.length
    const hasUnusedWidget = widgets.length < layout.length
    if (hasMissingWidgets) {
      const missingWidgets = widgets
        .filter((widget) => !layout.find((wp) => wp.i === widget))
        .map((widget) => GridWidgetPresets.getWidgetPreset(widget, breakpoint))

      layout.push(...missingWidgets)
    } else if (hasUnusedWidget) {
      layout = layout.filter((wp) => widgets.includes(wp.i))
    }

    return layout
  }, [breakpoint, widgets])

  const handleChange = useCallback(
    (_layout: Layout[]) => {
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
