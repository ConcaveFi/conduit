import { ChainId } from '@exchange/core'
import { ChevronIcon, DashboardIcon, NotificationIcon } from '@exchange/icons'
import { Button, Flex, ItemInfo, Modal, Text } from '@exchange/interface'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDisclosure } from 'src/hooks/useDisclosure'
import { useAccount, useConnect } from 'wagmi'
import { SearchInput } from './SearchInput'

export function Topbar() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const mapped = connectors
    .map((c) => {
      if (c.id !== 'injected') return { [c.name]: c }
      const name = c.name.substring(10, c.name.length - 1)
      return { [name]: c }
    })
    .reduce((prev, cur) => ({ ...prev, ...cur }), {})

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
        <Modal isOpen={isOpen} onClose={onClose} className="w-[360px]" space="large.eq" column>
          <Text size="lg" variant="heading">
            Connect wallet
          </Text>
          <Flex column className="gap-2">
            {Object.entries(mapped).map(([name, connector]) => (
              <Button
                className="py-8 bg-ocean-500 bg-opacity-60 hover:bg-opacity-100 rounded-xl  text-gray-400 justify-between px-4 items-center"
                onClick={() => connect({ connector })}
                centered={false}
                size="xl"
              >
                {name}
                <img
                  alt=""
                  width={28}
                  height={28}
                  src={`/assets/wallets/${name.toLowerCase().replace(' ', '-')}.svg`}
                />
              </Button>
            ))}
          </Flex>
          {/* <Flex className="h-[2px] w-full bg-ocean-300 bg-opacity-40"></Flex> */}

          <Flex column className="gap-2"></Flex>
        </Modal>
        {!isConnected && (
          <Button onClick={onOpen} variant="green-gradient" size="lg" className="py-2 px-8">
            Connect Wallet
          </Button>
        )}
        <Flex className="w-9 h-9 rounded-full border-[5px] border-ocean-300 p-2">
          <Flex className="w-full h-full bg-green-300 rounded-full"></Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
