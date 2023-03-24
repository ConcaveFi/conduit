'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, NotificationIcon } from '@tradex/icons'
import { Modal, cx } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { ExchangeCard } from 'app/exchange/components/SwapCard'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useLayout } from 'utils/contants/breakpoints'
import { useQueryModal } from 'utils/enum/urlModal'
import { truncateAddress } from 'utils/truncateAddress'
import { SidebarButton } from '../sidebar/SidebarButton'
import { LocationSelector } from './LocationSelector'
import { ThemeSelector } from './ThemeSelector'
// import { ThemeSelector } from './ThemeSelector'

function ConnectedAccount() {
  const isHydrated = useIsHydrated() // TODO
  return (
    <ConnectButton.Custom>
      {({ chain, openAccountModal, openChainModal, openConnectModal, account }) => {
        if (!account || !isHydrated) {
          return (
            <button onClick={openConnectModal} className="btn btn-green-gradient py-2 px-4">
              Connect wallet
            </button>
          )
        }
        return (
          <>
            <button onClick={openChainModal} className="btn btn-underline centered gap-2  text-xs">
              {chain?.name}
              <ChevronIcon className="fill-dark-30 ocean:fill-blue-30 h-3 w-3" />
            </button>
            <button className="btn btn-underline text-xs" onClick={openAccountModal}>
              {truncateAddress(account?.address)}
            </button>
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}

export function Topbar() {
  const { t } = useTranslation()
  const { isMobile } = useLayout()
  const swapModal = useQueryModal({ modalType: 'swap' })

  return (
    <div className="sm:px- flex items-center justify-between px-0">
      <div className=" flex h-full items-center gap-2">
        {isMobile && <SidebarButton />}

        <Image
          priority
          src={isMobile ? '/assets/conduit-mobile.svg' : '/assets/conduit.svg'}
          className="w-8 md:w-32 lg:w-48"
          alt="logo"
          width={10}
          height={10}
        />

        {!isMobile && (
          <>
            <NavButton href="/dashboard" label={t('dashboard')} disabled />
            <NavButton href="/" label={t('futures')} />
            <NavButton label="Swap" onClick={swapModal.onOpen} />
            <NavButton label="Leaderboard" href="/leaderboard" />
          </>
        )}
      </div>
      <div className="flex w-fit items-center gap-3 ">
        {!isMobile && <LocationSelector />}
        <ThemeSelector />

        <NotificationIcon className="fill-dark-accent ocean:fill-blue-accent box-4" />
        <ConnectedAccount />
      </div>
      <Modal className="w-full sm:w-auto" isOpen={swapModal.isOpen} onClose={swapModal.onClose}>
        <ExchangeCard />
      </Modal>
    </div>
  )
}

interface NavButtonProps {
  label: string
  href?: string
  disabled?: boolean
  onClick?(): void
}
function NavButton(props: NavButtonProps) {
  const router = useRouter()
  const path = usePathname()
  const { href, label, disabled = false } = props

  const selected = path === href
  return (
    <button
      disabled={disabled}
      aria-selected={selected}
      onClick={() => (href ? router.push(href) : props.onClick?.())}
      className={cx(
        'btn centered h-full rounded-none px-5 text-xs font-medium ',
        'btn-underline aria-selected:btn-bottom-glow aria-selected:py-1',
      )}
    >
      {label}
    </button>
  )
}
