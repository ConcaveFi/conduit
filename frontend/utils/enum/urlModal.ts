import { atom, useAtom } from 'jotai'
import { atomWithLocation } from 'jotai-location'
import { atomFamily } from 'jotai/utils'
import { Router } from 'next/router'
import { useMemo } from 'react'

type QueryModal =
  | { modalType: `add_widget`; type: never }
  | { modalType: `swap`; type: never }
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
const modalAtomFamily = atomFamily(({ modalType, type }: QueryModal) =>
  atom(
    (get) => {
      const searchParams = get(locationAtom).searchParams
      return searchParams?.get('modalType') === modalType
    },
    (get, set, v: 'open' | 'close') => {
      const searchParams = get(locationAtom).searchParams
      searchParams?.delete('modalType')
      searchParams?.delete('type')
      if (v === 'open') {
        searchParams?.append('modalType', modalType)
        searchParams?.append('type', type)
      }
      set(locationAtom, { searchParams })
      return v === 'open'
    },
  ),
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
