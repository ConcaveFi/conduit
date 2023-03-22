import { Layout } from 'react-grid-layout'
import { Breakpoints } from '../contants/breakpoints'
import { GridWidgets } from './grid.widgets'

const X_EXTRA_LARGE_LAYOUT: WidgetPreset = {
  'chart-panel': { x: 3, y: 0, w: 6, h: 7 },
  'news-panel': { x: 0, y: 6, w: 3, h: 5 },
  'order-panel': { x: 12, y: 0, w: 3, h: 10 },
  'trades-panel': { x: 0, y: 0, w: 3, h: 5 },
  'views-panel': { x: 3, y: 15, w: 6, h: 3 },
}

const EXTRA_LARGE_LAYOUT: WidgetPreset = {
  'chart-panel': { x: 0, y: 0, w: 9, h: 6 },
  'news-panel': { x: 9, y: 0, w: 3, h: 3 },
  'order-panel': { x: 12, y: 0, w: 3, h: 9 },
  'trades-panel': { x: 0, y: 9, w: 3, h: 3 },
  'views-panel': { x: 3, y: 15, w: 6, h: 3 },
}

const LARGE_LAYOUT: WidgetPreset = {
  'chart-panel': { x: 0, y: 0, w: 8, h: 6 },
  'news-panel': { x: 4, y: 6, w: 4, h: 3 },
  'order-panel': { x: 12, y: 0, w: 4, h: 9 },
  'trades-panel': { x: 0, y: 9, w: 4, h: 3 },
  'views-panel': { x: 0, y: 5, w: 8, h: 3 },
}

const MEDIUM_LAYOUT: WidgetPreset = {
  'chart-panel': { x: 0, y: 0, w: 7, h: 2 },
  'news-panel': { x: 4, y: 6, w: 4, h: 2.4 },
  'order-panel': { x: 12, y: 0, w: 5, h: 3.5 },
  'trades-panel': { x: 0, y: 9, w: 4, h: 2.4 },
  'views-panel': { x: 0, y: 5, w: 7, h: 1.5 },
}

// This layout will be handled different in the future
const SMALL_LAYOUT: WidgetPreset = {
  'chart-panel': { x: 0, y: 0, w: 12, h: 4 },
  'news-panel': { x: 0, y: 6, w: 12, h: 4 },
  'order-panel': { x: 0, y: 2, w: 12, h: 8 },
  'trades-panel': { x: 0, y: 12, w: 12, h: 4 },
  'views-panel': { x: 0, y: 5, w: 12, h: 4 },
}

/**
 *  @description
 * GridWidgetPresets is a class responsible to handle grid layouts according to the current breakpoint.
 * These layouts are DEFAULT layouts, it means that this is class is not responsible to handle `ReactGridLayout`
 * and his components, this is just a handler to avoid has a broking layout according to the user screen.
 * @see IMPORTANT - if users has changed layout on app, it will be handled by (archine not done)
 *
 * @property layouts return all breakpoint layouts
 */
export class GridWidgetPresets {
  public static readonly layouts = [
    X_EXTRA_LARGE_LAYOUT,
    EXTRA_LARGE_LAYOUT,
    LARGE_LAYOUT,
    MEDIUM_LAYOUT,
    SMALL_LAYOUT,
  ]

  public static toLayout(preset: WidgetPreset): Layout[] {
    const formatted = Object.entries(preset).map(([i, remaining]) => {
      return {
        i,
        resizeHandles: ['se'],
        isResizable: true,
        ...remaining,
      } satisfies Layout
    })
    return formatted
  }

  public static getWidgetPreset(widget: GridWidgets, breakpoint: Breakpoints): Layout {
    const layoutPreset = GridWidgetPresets.getRawByBreakpoint(breakpoint)
    const preset = layoutPreset[widget]
    return { i: widget, ...preset, resizeHandles: ['se'], isResizable: true }
  }

  public static getRawByBreakpoint(breakpoint: Breakpoints) {
    switch (breakpoint) {
      case '2xl':
        return X_EXTRA_LARGE_LAYOUT
      case 'xl':
        return EXTRA_LARGE_LAYOUT
      case 'lg':
        return LARGE_LAYOUT
      case 'md':
        return MEDIUM_LAYOUT
      case 'sm':
        return SMALL_LAYOUT
    }
  }

  public static getByBreakpoint(breakpoint: Breakpoints): Layout[] {
    switch (breakpoint) {
      case '2xl':
        return this.toLayout(X_EXTRA_LARGE_LAYOUT)
      case 'xl':
        return this.toLayout(EXTRA_LARGE_LAYOUT)
      case 'lg':
        return this.toLayout(LARGE_LAYOUT)
      case 'md':
        return this.toLayout(MEDIUM_LAYOUT)
      case 'sm':
        return this.toLayout(SMALL_LAYOUT)
    }
  }
}

export type WidgetPreset = { [key in GridWidgets]: Omit<Layout, 'i'> }
