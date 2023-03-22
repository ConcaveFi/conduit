'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, NotificationIcon } from '@tradex/icons'
import { Modal } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { ExchangeCard } from 'app/exchange/components/SwapCard'
import { useIsHydrated } from 'app/providers/IsHydratedProvider'
import Image from 'next/image'
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
            <button className="btn btn-underline  centered ml-6 h-full rounded-none px-5 text-xs font-medium">
              {t('dashboard')}
            </button>
            <button className="btn btn-bottom-glow  centered  h-full rounded-none px-5 py-1 text-xs font-medium">
              {t('futures')}
            </button>
            <button
              onClick={swapModal.onOpen}
              className="btn btn-underline centered text-blue-accent h-full rounded-none px-5 text-xs font-medium"
            >
              Swap
            </button>
            <button className="btn btn-underline centered h-full rounded-none px-5 text-xs  font-medium">
              Leaderboard
            </button>
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
