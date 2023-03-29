'use client'

import { CloseIcon } from '@tradex/icons'
import { cx } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQueryModal } from 'utils/enum/urlModal'

export const sidebarOpen = atom(false)

export const Sidebar = () => {
  const { t } = useTranslation()
  const swapModal = useQueryModal({ modalType: 'swap' })
  const [isOpen, setOpen] = useAtom(sidebarOpen)
  const handleSidebar = () => {
    setOpen((v) => !v)
  }
  const path = usePathname()
  const navbuttonStyle = cx(
    'btn centered  h-full w-full rounded-none px-5 py-1 text-sm font-medium',
    'aria-selected:btn-bottom-glow aria-deselected:btn-underline',
  )
  return (
    <>
      <div
        className={`fixed z-40 h-screen  ${isOpen ? 'w-screen' : 'w-0'}`}
        onClick={handleSidebar}
      >
        <div
          onClick={(ev) => ev.stopPropagation()}
          className={`fixed top-0 left-0    h-full  w-[80vw]  bg-black bg-opacity-50 backdrop-blur-lg backdrop-filter  duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full w-full flex-col justify-center">
            <button className="absolute top-0 right-0 z-40 p-4" onClick={() => setOpen(false)}>
              <CloseIcon className="stroke-dark-30 ocean:stroke-blue-30 text-blue-blue h-4 w-4 text-sm hover:underline" />
            </button>
            <div className=" p-8">
              <nav className="bg-blackz flex h-full w-full flex-col justify-center gap-8 py-20">
                <button className="btn btn-underline centered  h-full w-full rounded-none px-5 text-sm font-medium">
                  Dashboard
                </button>

                <Link aria-selected={path === '/'} href={'/'} className={navbuttonStyle}>
                  {t('futures')}
                </Link>
                <button
                  onClick={() => swapModal.onOpen()}
                  className={
                    'btn btn-underline centered  h-full w-full rounded-none px-5 text-sm font-medium'
                  }
                >
                  Exchange
                </button>
                <Link
                  aria-selected={path === '/leaderboard'}
                  href={'/leaderboard'}
                  className={navbuttonStyle}
                >
                  Leaderboard
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
