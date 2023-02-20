import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'

export interface RouterEventsHook {
  beforeHistoryChange?(e: any): void
  routeComplete?(e: any): void
  routeStart?(e: any): void
  routeError?(e: any): void
  hashComplete?(e: any): void
  hashStart?(e: any): void
  onIsReady?(router: NextRouter): void
}

export type RouterEvents =
  | 'beforeHistoryChange'
  | 'hashChangeComplete'
  | 'routeChangeError'
  | 'hashChangeStart'
  | 'routeChangeStart'
  | 'routeChangeComplete'

export const ROUTER_EVENTS: { [key in RouterEvents]: keyof RouterEventsHook } = {
  beforeHistoryChange: 'beforeHistoryChange',
  hashChangeComplete: 'hashComplete',
  routeChangeError: 'routeError',
  hashChangeStart: 'hashStart',
  routeChangeStart: 'routeStart',
  routeChangeComplete: 'routeComplete',
}
type RouterEvent = { [key in RouterEvents]: (e: any) => void }
export function useRouterEvents(props: RouterEventsHook) {
  const router = useRouter()

  // This function will attach all listeners provided by router
  // You can find these events on router.events.on(__event__)
  function atatchEvents() {
    const addedEvents = {} as RouterEvent
    for (const [event, handler] of Object.entries(ROUTER_EVENTS)) {
      const eventHandler = props[handler]
      if (!eventHandler) continue

      router.events.on(event as RouterEvents, eventHandler)
      Object.assign(addedEvents, { [event]: eventHandler })
    }
    return addedEvents
  }

  // this function will detatch all added events on router
  function detatchEvents(events: RouterEvent) {
    for (const [event, handler] of Object.entries(events)) {
      router.events.off(event as RouterEvents, handler)
    }
  }

  useEffect(() => {
    const events = atatchEvents()
    return () => detatchEvents(events)
  }, [])
  useEffect(() => (router.isReady ? props.onIsReady?.(router) : undefined), [router.isReady])

  return { router }
}
