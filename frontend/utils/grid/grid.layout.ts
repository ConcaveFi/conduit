import { Layout } from 'react-grid-layout'
import type { Breakpoints } from '../contants/breakpoints'

export const GRID_LAYOUT_ITEM = 'grid.layout'
export class GridLayout {
  /**
   * @description
   * it returns a layout stored on local storage, note that you should pass the current breakpoint for that.
   * But thy? this occurs because now the layout passed on `ReactGridLayout` component is based on user display.
   *
   * @param breakpoint
   */
  public static getStoredlayout(breakpoint: Breakpoints) {
    const item = localStorage.getItem(this.storageItem(breakpoint))
    if (!item) return undefined
    return JSON.parse(item) as Layout[]
  }

  public static storeLayout(layout: Layout[], breakpoint: Breakpoints) {
    const stringified = JSON.stringify(layout)
    localStorage.setItem(this.storageItem(breakpoint), stringified)
    return true
  }

  private static storageItem(breakpoint: Breakpoints) {
    return GRID_LAYOUT_ITEM.concat(':').concat(breakpoint)
  }
}
