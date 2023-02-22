import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronIcon, DashboardIcon, NotificationIcon } from '@tradex/icons'
import { Button, Flex, ItemInfo, Text } from '@tradex/interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { truncateAddress } from 'src/utils/truncateAddress'
import { useAccount } from 'wagmi'
import { SearchInput } from './SearchInput'

export function Topbar() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const { asPath, pathname, query } = router
  const locale = router.locale === 'pt' ? 'us' : 'pt'

  return (
    <Flex align="center" justify="between">
      <Flex align="center" className="gap-2">
        <Image src={'/assets/logo.png'} alt="logo" width={45} height={30} />
        <Text variant="heading.light">
          TRADE <strong>X</strong>
        </Text>
        <Button className="ml-8" variant="underline" size="lg">
          Futures
        </Button>
        <Button variant="underline" size="lg">
          Options
        </Button>
        <Button variant="bottom-glow" size="lg">
          Strategy
          <ChevronIcon />
        </Button>
        <SearchInput />
      </Flex>
      <Flex align="center" className="gap-6 w-fit">
        <Button onClick={() => router.push({ query, pathname }, asPath, { locale })}>
          <Image
            src={'/assets/usa.png'}
            className="object-contain"
            alt="usa"
            width={25}
            height={10}
          />
        </Button>
        <DashboardIcon className="w-5 h-5 fill-ocean-200" />
        <Flex className="w-9 h-9 p-[5px] rounded-full bg-sky-300 bg-opacity-70">
          <Flex className="w-full h-full rounded-full bg-sky-300" />
        </Flex>
        <NotificationIcon className="w-5 h-5 fill-ocean-200" />
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
                  <ChevronIcon className="w-3 h-3 fill-ocean-200" />
                </Button>
                <Button onClick={openAccountModal}>
                  <ItemInfo info={truncateAddress(account?.address)} value="$ 2,548.04" />
                </Button>
              </Flex>
            )
          }}
        </ConnectButton.Custom>
        <Flex className="w-9 h-9 rounded-full border-[5px] border-ocean-300 p-2">
          <Flex className="w-full h-full bg-green-300 rounded-full"></Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
