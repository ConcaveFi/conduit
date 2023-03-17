import { atom, useAtom } from "jotai";

export const innerWidthAtom = atom(0)
innerWidthAtom.onMount = (set) => {
  if (typeof window === 'undefined') return
  set(window.innerWidth)

  const resizeListener = () => set(window.innerWidth)
  window.addEventListener('resize', resizeListener)
  return () => window.removeEventListener('resize', resizeListener)
}

export const createBreakpointAtom = <T extends { [key: string]: number }>(breakpoints: T, defaultValue: keyof T) => {
  const sortedBreakpoints = atom(Object.entries(breakpoints).sort(([, a], [, b]) => a - b))
  const breakpointAtom = atom((get) => {
    const w = get(innerWidthAtom)
    const breakpoints = get(sortedBreakpoints)
    const [label] = breakpoints.find(([, limit]) => (w < limit)) || [defaultValue]
    return label as keyof T
  })
  return breakpointAtom
}

/**
 * @description
 *  BREAKPOINTS it's a variable that match all `@media` variants of tailwind.
 *
 * Breakpoint values:
 * - sm = `@media` (min-width: 640px)
 * - md = `@media` (min-width: 768px)
 * - lg = `@media` (min-width: 1024px)
 * - xl = `@media` (min-width: 1280px)
 * - 2xl = `@media` (min-width: 1536px)
 * */

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
export const breakpointAtom = createBreakpointAtom(breakpoints, 'lg')
export type Breakpoints = keyof typeof breakpoints