import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface RouterEventsHook {
  beforeHistoryChange?(e: any): void
  routeComplete?(e: any): void
  routeStart?(e: any): void
  routeError?(e: any): void
  hashComplete?(e: any): void
  hashStart?(e: any): void
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

export function useRouterEvents(props: RouterEventsHook) {
  const router = useRouter()
  useEffect(() => {
    const eventsAdded = {} as { [key in RouterEvents]: (e: any) => void }

    Object.entries(ROUTER_EVENTS).forEach(([eName, fName]) => {
      const eventHandler = props[fName]
      if (!eventHandler) return

      router.events.on(eName as RouterEvents, eventHandler)
      eventsAdded[eName as RouterEvents] = eventHandler
    })
    return () => {
      Object.entries(eventsAdded).forEach(([event, handler]) => {
        router.events.off(event as RouterEvents, handler)
      })
    }
  }, [])

  return { router }
}
