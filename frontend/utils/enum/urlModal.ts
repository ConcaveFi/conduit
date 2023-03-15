import deepEqual from 'fast-deep-equal'
import { atom, useAtom } from 'jotai'
import { atomWithLocation } from 'jotai-location'
import { atomFamily } from 'jotai/utils'
import { Router } from 'next/router'
import { useMemo } from 'react'

type QueryModal =
  | { modalType: `add_widget` }
  | { modalType: `swap` }
  | { modalType: `margin`; type: 'withdraw' | 'transfer' }

const locationAtom = atomWithLocation({
  replace: true,
  subscribe: (callback) => {
    Router.events.on('routeChangeComplete', callback)
    window.addEventListener('hashchange', callback)
    return () => {
      Router.events.off('routeChangeComplete', callback)
      window.removeEventListener('hashchange', callback)
    }
  },
})
const modalAtomFamily = atomFamily(
  ({ modalType, ...otherProps }: QueryModal) =>
    atom(
      (get) => {
        const searchParams = get(locationAtom).searchParams
        return searchParams?.get('modalType') === modalType
      },
      (get, set, v: 'open' | 'close') => {
        const searchParams = get(locationAtom).searchParams
        searchParams?.delete('modalType')
        Object.keys(otherProps).forEach((key) => {
          searchParams?.delete(key)
        })
        if (v === 'open') {
          searchParams?.append('modalType', modalType)
          Object.entries(otherProps).forEach(([key, value]) => {
            searchParams?.append(key, value)
          })
        }
        set(locationAtom, { searchParams })
        return v === 'open'
      },
    ),
  deepEqual,
)

export const useQueryModal = (type: QueryModal) => {
  const [isOpen, setState] = useAtom(modalAtomFamily(type))
  return useMemo(
    () => ({
      isOpen,
      onClose: () => setState('close'),
      onOpen: () => setState('open'),
    }),
    [isOpen, setState],
  )
}
