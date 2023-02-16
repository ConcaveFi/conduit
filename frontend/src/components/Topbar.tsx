import { ChevronIcon, DashboardIcon, NotificationIcon } from '@tradex/icons'
import { Button, Flex, ItemInfo, Panel, Text } from '@tradex/interface'
import { Popover } from '@tradex/interface'
import Image from 'next/image'
import { Fragment } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { mainnet, optimism, optimismGoerli } from 'wagmi/chains'
import { SearchInput } from './SearchInput'
import { ConnectButton } from './wallet/ConnectButton'
import { ConnectModal } from './wallet/ConnectModal'

export function Topbar() {
  const { address, isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
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
            <Popover column centered>
              <Popover.Button variant="secondary" size="lg" className={'py-2'}>
                {chain?.name}
                <ChevronIcon className="w-3 h-3 fill-ocean-200" />
              </Popover.Button>
              <Popover.Panel className="w-52 p-2 gap-2" column>
                <Button
                  variant="primary"
                  size="xl"
                  centered={false}
                  className="justify-start px-2 items-center"
                  onClick={() => switchNetwork && switchNetwork(mainnet.id)}
                >
                  <img src="/assets/networks/eth.png" className="rounded-full w-6" />
                  Ethereum
                </Button>
                <Button
                  variant="primary"
                  size="xl"
                  centered={false}
                  className="justify-start px-2 items-center"
                  onClick={() => switchNetwork && switchNetwork(optimism.id)}
                >
                  <img src="/assets/networks/optimism.png" className="rounded-full w-6" />
                  Optimism
                </Button>
                <Button
                  variant="primary"
                  size="xl"
                  centered={false}
                  className="justify-start px-2 items-center"
                  onClick={() => switchNetwork && switchNetwork(optimismGoerli.id)}
                >
                  <img src="/assets/networks/optimism.png" className="rounded-full w-6" />
                  Optimism Goerli
                </Button>
              </Popover.Panel>
            </Popover>

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
