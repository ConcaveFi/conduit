import { ChevronIcon, DashboardIcon, NotificationIcon } from '@exchange/icons'
import { Button, Flex, ItemInfo, Text } from '@exchange/interface'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { SearchInput } from './SearchInput'
import { ConnectButton } from './wallet/ConnectButton'
import { ConnectModal } from './wallet/ConnectModal'

export function Topbar() {
  const { address, isConnected } = useAccount()
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
        <Image
          src={'/assets/usa.png'}
          className="object-contain"
          alt="usa"
          width={25}
          height={10}
        />
        <DashboardIcon className="w-5 h-5 fill-ocean-200" />
        <Flex className="w-9 h-9 p-[5px] rounded-full bg-sky-300 bg-opacity-70">
          <Flex className="w-full h-full rounded-full bg-sky-300" />
        </Flex>
        <NotificationIcon className="w-5 h-5 fill-ocean-200" />
        {isConnected && (
          <>
            <Button variant="primary" size="lg" className="py-2">
              Optimism
              <ChevronIcon className="w-3 h-3 fill-ocean-200" />
            </Button>
            <ItemInfo info="0xb30...9af7f" value="$ 2,548.04" />
          </>
        )}
        {!isConnected && <ConnectButton />}
        <Flex className="w-9 h-9 rounded-full border-[5px] border-ocean-300 p-2">
          <Flex className="w-full h-full bg-green-300 rounded-full"></Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
