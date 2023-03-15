import { useCallback, useEffect, useState } from 'react'
import { Layout } from 'react-grid-layout'
import { useBreakpoint } from 'use-breakpoint'
import { BREAKPOINTS } from 'utils/contants/breakpoints'
import { GridLayout } from 'utils/grid/grid.layout'
import { GridWidgetPresets } from 'utils/grid/widgets.presets'

export interface GridLayoutHook {
  defaultLayout?: Layout[]
}
export function useGridLayout(props?: GridLayoutHook) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS)
  const [layout, setLayout] = useState(props?.defaultLayout)

  useEffect(() => {
    if (breakpoint === undefined) return

    const stored = GridLayout.getStoredlayout(breakpoint)
    if (stored !== undefined) return setLayout(stored)

    setLayout(GridWidgetPresets.getByBreakpoint(breakpoint))
  }, [breakpoint])

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
