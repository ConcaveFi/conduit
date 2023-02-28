import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, DashboardIcon, NotificationIcon } from '@tradex/icons'
import { ItemInfo } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { format } from 'src/utils/format'
import { Theme } from 'src/utils/themeHandler'
import { truncateAddress } from 'src/utils/truncateAddress'
import { useAccount, useBalance } from 'wagmi'
import { SearchInput } from '../SearchInput'
import { LocationSelector } from './LocationSelector'
import { ThemeSelector } from './ThemeSelector'

export function Topbar() {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { address } = useAccount()
  const { data } = useBalance({ address })
  const [theme, setTheme] = useState(Theme.getStoredTheme())

  useEffect(() => {
    console.log(document.documentElement.classList)
  }, [theme])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={'/assets/logo.png'} alt="logo" width={45} height={30} />
        <span className="text-white">
          TRADE <strong>X</strong>
        </span>
        <button className="btn btn-bottom-glow centered w-[120px] rounded-none">
          {t('futures')}
        </button>
        <button className="btn btn-underline centered w-[120px] rounded-none">
          {t('options')}
        </button>
        <button className="btn btn-underline centered w-[120px]  rounded-none">
          {t('strategy')} <ChevronIcon className="fill-light-500 ocean:fill-ocean-100 h-3 w-3" />
        </button>
        <SearchInput />
      </div>
      <div className="flex w-fit items-center gap-6">
        <LocationSelector />
        <ThemeSelector />
        <DashboardIcon className="fill-ocean-200 btn- h-5 w-5" />

        <NotificationIcon className="fill-ocean-200 h-5 w-5" />
        <ConnectButton.Custom>
          {({ chain, openAccountModal, openChainModal, openConnectModal, account }) => {
            if (!isConnected) {
              return (
                <button
                  onClick={openConnectModal}
                  className="btn btn-green-gradient py-22 px-6 py-2"
                >
                  Connect wallet
                </button>
              )
            }
            return (
              <div className="flex gap-4">
                <button onClick={openChainModal} className="btn btn-primary centered gap-2 px-4">
                  <img src={chain?.iconUrl} className="w-6" alt="" />
                  {chain?.name}
                  <ChevronIcon className="fill-ocean-200 h-3 w-3" />
                </button>
                <button className="btn" onClick={openAccountModal}>
                  <ItemInfo
                    align="end"
                    info={truncateAddress(account?.address)}
                    value={format(data?.formatted || '0')}
                  />
                </button>
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}