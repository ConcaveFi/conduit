import { useCallback, useEffect, useMemo, useState } from 'react'
import { Layout } from 'react-grid-layout'
import { BREAKPOINTS } from 'src/utils/contants/breakpoints'
import { GridLayout } from 'src/utils/grid/grid.layout'
import { GridWidgetPresets } from 'src/utils/grid/widgets.presets'
import { useBreakpoint } from 'use-breakpoint'

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
