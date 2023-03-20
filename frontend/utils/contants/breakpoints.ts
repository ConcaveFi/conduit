import { atom, useAtomValue } from 'jotai'

export const innerWidthAtom = atom(0)
innerWidthAtom.onMount = (set) => {
  if (typeof window === 'undefined') return
  set(window.innerWidth)
  const resizeListener = () => set(window.innerWidth)
  window.addEventListener('resize', resizeListener)
  return () => window.removeEventListener('resize', resizeListener)
}

const createBreakpointAtom = <T extends { [key: string]: number }>(breakpoints: T) => {
  const sortedBreakpoints = Object.entries(breakpoints).sort(([, a], [, b]) => a - b)
  const lastBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1]
  const breakpointAtom = atom((get) => {
    const w = get(innerWidthAtom)
    if (!w) return
    const [label] = sortedBreakpoints.find(([, limit]) => w < limit) || lastBreakpoint
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
export const breakpointAtom = createBreakpointAtom(breakpoints)
export type Breakpoints = keyof typeof breakpoints

export const useLayout = () => {
  const isMobile = useAtomValue(breakpointAtom) === 'sm'
  return { isMobile, isDesktop: !isMobile }
}
