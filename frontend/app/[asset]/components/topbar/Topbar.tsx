'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, NotificationIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import Image from 'next/image'
import { truncateAddress } from 'utils/truncateAddress'
import { useAccount, useBalance } from 'wagmi'
import { LocationSelector } from './LocationSelector'
// import { ThemeSelector } from './ThemeSelector'

export function Topbar() {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { address } = useAccount()
  const { data } = useBalance({ address })

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex h-full items-center gap-2">
        <Image
          priority
          src={'/assets/conduit.svg'}
          className="w-[160px]"
          alt="logo"
          width={10}
          height={10}
        />

        <button className="btn btn-underline centered ml-6 h-full rounded-none px-5 text-xs font-medium">
          {t('dashboard')}
        </button>
        <button className="btn btn-bottom-glow  centered  h-full rounded-none px-5 text-xs font-medium">
          {t('futures')}
        </button>
        <button className="btn btn-underline centered h-full rounded-none px-5 text-xs font-medium">
          Swap
        </button>
        <button className="btn btn-underline centered h-full rounded-none px-5 text-xs  font-medium">
          Leaderboard
        </button>
      </div>
      <div className="flex w-fit items-center gap-3 ">
        <LocationSelector />
        {/* <ThemeSelector /> */}

        <NotificationIcon className="fill-ocean-200 box-4" />
        <ConnectButton.Custom>
          {({ chain, openAccountModal, openChainModal, openConnectModal, account }) => {
            if (!isConnected) {
              return (
                <button onClick={openConnectModal} className="btn btn-green-gradient py-2">
                  Connect wallet
                </button>
              )
            }
            return (
              <>
                <button
                  onClick={openChainModal}
                  className="btn btn-underline centered gap-2 text-xs"
                >
                  {chain?.name}
                  <ChevronIcon className="fill-ocean-200 h-3 w-3" />
                </button>
                <button className="btn btn-underline text-xs" onClick={openAccountModal}>
                  {truncateAddress(account?.address)}
                </button>
              </>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}
