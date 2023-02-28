import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, DashboardIcon, NotificationIcon } from '@tradex/icons'
import { ItemInfo, Menu, Text } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import Image from 'next/image'
import { useState } from 'react'
import { Theme, Themes } from 'src/utils/themeHandler'
import { truncateAddress } from 'src/utils/truncateAddress'
import { useAccount, useBalance } from 'wagmi'
import { SearchInput } from '../SearchInput'
import { LocationSelector } from './LocationSelector'

export function Topbar() {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { address } = useAccount()
  const { data } = useBalance({ address })
  const [theme, setTheme] = useState(Theme.getStoredTheme())

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={'/assets/logo.png'} alt="logo" width={45} height={30} />
        <Text variant="heading.light">
          TRADE <strong>X</strong>
        </Text>
        <button className="btn btn-bottom-glow centered w-[120px] rounded-none">
          {t('futures')}
        </button>
        <button className="btn btn-underline centered w-[120px] rounded-none">
          {t('options')}
        </button>
        <button className="btn btn-underline centered w-[120px] rounded-none">
          {t('strategy')} <ChevronIcon />
        </button>
        <SearchInput />
      </div>
      <div className="flex w-fit items-center gap-6">
        <LocationSelector />
        <DashboardIcon className="fill-ocean-200 btn- h-5 w-5" />
        <div className="h-9 w-9 rounded-full bg-sky-300 bg-opacity-70 p-[5px]">
          <div className="h-full w-full rounded-full bg-sky-300" />
        </div>
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
                  <ItemInfo info={truncateAddress(account?.address)} value="$ 2,548.04" />
                </button>
              </div>
            )
          }}
        </ConnectButton.Custom>
        <Menu>
          <Menu.Button>
            <span className="testing">{theme}</span>
          </Menu.Button>
          <Menu.Items variant={'glass'} className="right-0 gap-2 p-3 dark:text-left">
            {Object.values(Themes)
              .filter((_theme) => _theme !== theme)
              .map((_theme) => (
                <Menu.Button
                  key={_theme}
                  onClick={() => Theme.select(_theme)}
                  className="btn btn-underline.secondary centered"
                >
                  {_theme}
                </Menu.Button>
              ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  )
}
