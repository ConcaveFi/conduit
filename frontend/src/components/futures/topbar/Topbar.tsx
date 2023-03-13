'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, NotificationIcon } from '@tradex/icons'
import { ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import Image from 'next/image'
import { format } from 'src/utils/format'
import { truncateAddress } from 'src/utils/truncateAddress'
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
      <div className="flex items-center h-full gap-2">
        <Image
          priority
          src={'/assets/conduit.svg'}
          className="w-[160px]"
          alt="logo"
          width={10}
          height={10}
        />

        <button className="btn btn-underline centered ml-6 px-5 font-medium h-full text-xs rounded-none">
          {t('dashboard')}
        </button>
        <button className="btn btn-bottom-glow  centered  px-5 font-medium h-full text-xs rounded-none">
          {t('futures')}
        </button>
        <button className="btn btn-underline centered px-5 font-medium h-full text-xs rounded-none">
          Swap
        </button>
        <button className="btn btn-underline centered px-5 font-medium h-full text-xs  rounded-none">
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
                  className="btn btn-underline text-xs centered gap-2"
                >
                  {chain?.name}
                  <ChevronIcon className="fill-ocean-200 h-3 w-3" />
                </button>
                <button className="btn" onClick={openAccountModal}>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-ocean-200">
                      {truncateAddress(account?.address)}
                    </span>
                    <span className="text-xs font-bold text-bright-text">
                      {format(data?.formatted || '0')} ETH
                    </span>
                  </div>
                </button>
              </>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}
