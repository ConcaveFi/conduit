'use client'

import { MennuIcon } from '@tradex/icons'
import { useAtom } from 'jotai'
import { sidebarOpen } from './Sidebar'

export const SidebarButton = () => {
  const [isOpen, setOpen] = useAtom(sidebarOpen)
  return (
    <button onClick={() => setOpen((prev) => !prev)}>
      <MennuIcon className={'fill-blue-accent'} />
    </button>
  )
}
