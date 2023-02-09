import { ChainId } from '@tradex/core'
import { ChevronIcon, DashboardIcon, NotificationIcon } from '@tradex/icons'
import { Button, Flex, ItemInfo, Panel, Text } from '@tradex/interface'
import { Menu, Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
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
            <Popover as={'div'} className="relative  ">
              <Popover.Button as={Button} variant="primary" size="lg" className={'py-2'}>
                {chain?.name}
                <ChevronIcon className="w-3 h-3 fill-ocean-200" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition-all duration-300 ease-out"
                enterFrom="opacity-0 scale-75"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-300 ease-out"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <Popover.Panel
                  className="absolute origin-top-right right-0 gap-2 p-2 top-full mt-2 right- w-56 shadow-xl bg-ocean-800 border-2 border-ocean-300 border-opacity-50 rounded-lg "
                  as={Flex}
                  column
                >
                  <Button
                    variant="primary"
                    size="xl"
                    centered={false}
                    className="justify-start px-2 items-center"
                    onClick={() => switchNetwork(ChainId.ETHEREUM)}
                  >
                    <img src="/assets/networks/eth.png" className="rounded-full w-6" />
                    Ethereum
                  </Button>
                  <Button
                    variant="primary"
                    size="xl"
                    centered={false}
                    className="justify-start px-2 items-center"
                    onClick={() => switchNetwork(ChainId.OPTIMISM)}
                  >
                    <img src="/assets/networks/optimism.png" className="rounded-full w-6" />
                    Optimism
                  </Button>
                  <Button
                    variant="primary"
                    size="xl"
                    centered={false}
                    className="justify-start px-2 items-center"
                    onClick={() => switchNetwork(ChainId.OPTiMISM_GÖRLI)}
                  >
                    <img src="/assets/networks/optimism.png" className="rounded-full w-6" />
                    Optimism Goerli
                  </Button>
                </Popover.Panel>
              </Transition>
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
