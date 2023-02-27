import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, DashboardIcon, NotificationIcon } from '@tradex/icons'
import { Button, Flex, ItemInfo, Menu, Text } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import Image from 'next/image'
import { Themes } from 'src/utils/themeHandler'
import { truncateAddress } from 'src/utils/truncateAddress'
import { useAccount, useBalance } from 'wagmi'
import { SearchInput } from '../SearchInput'
import { LocationSelector } from './LocationSelector'

export function Topbar() {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { address } = useAccount()
  const { data } = useBalance({ address })
  return (
    <Flex align="center" justify="between">
      <Flex align="center" className="gap-2">
        <Image src={'/assets/logo.png'} alt="logo" width={45} height={30} />
        <Text variant="heading.light">
          TRADE <strong>X</strong>
        </Text>
        <Button className="ml-8" variant="underline" size="lg">
          {t('futures')}
        </Button>
        <Button variant="underline" size="lg">
          {t('options')}
        </Button>
        <Button variant="bottom-glow" size="lg">
          {t('strategy')} <ChevronIcon />
        </Button>
        <SearchInput />
      </Flex>
      <Flex align="center" className="w-fit gap-6">
        <LocationSelector />
        <DashboardIcon className="fill-ocean-200 h-5 w-5" />
        <Flex className="h-9 w-9 rounded-full bg-sky-300 bg-opacity-70 p-[5px]">
          <Flex className="h-full w-full rounded-full bg-sky-300" />
        </Flex>
        <NotificationIcon className="fill-ocean-200 h-5 w-5" />
        <ConnectButton.Custom>
          {({ chain, openAccountModal, openChainModal, openConnectModal, account }) => {
            if (!isConnected) {
              return (
                <Button
                  onClick={openConnectModal}
                  variant={'green-gradient'}
                  className="py-2"
                  size={'lg'}
                >
                  Connect wallet
                </Button>
              )
            }
            return (
              <Flex className="gap-4">
                <Button variant={'primary'} size="lg" onClick={openChainModal} className="gap-2">
                  <img src={chain?.iconUrl} className="w-6" alt="" />
                  {chain?.name}
                  <ChevronIcon className="fill-ocean-200 h-3 w-3" />
                </Button>
                <Button onClick={openAccountModal}>
                  <ItemInfo
                    info={truncateAddress(account?.address)}
                    value={format(data?.formatted || '0')}
                  />
                </Button>
              </Flex>
            )
          }}
        </ConnectButton.Custom>
        <Menu>
          <Menu.Button>
            <span className="testing">{theme}</span>
          </Menu.Button>
          <Menu.Items column variant={'glass'} className="testing right-0 gap-2 p-3 dark:text-left">
            {Object.values(Themes)
              .filter((_theme) => _theme !== theme)
              .map((_theme) => (
                <Menu.Button
                  key={_theme}
                  onClick={handleTheme(_theme)}
                  variant="underline.secondary"
                >
                  {_theme}
                </Menu.Button>
              ))}
          </Menu.Items>
        </Menu>
      </Flex>
    </Flex>
  )
}
