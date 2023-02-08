import { Button, Flex, Modal, Text } from '@exchange/interface'
import { useConnectWallet } from 'src/context/ConnectWalletProvider'
import { useConnect } from 'wagmi'

export function ConnectModal() {
  const { connect, connectors } = useConnect()
  const { isOpen, close } = useConnectWallet()
  const mapped = connectors
    .map((c) => {
      if (c.id !== 'injected') return { [c.name]: c }
      const name = c.name.substring(10, c.name.length - 1)
      return { [name]: c }
    })
    .reduce((prev, cur) => ({ ...prev, ...cur }), {})
  return (
    <Modal isOpen={isOpen} onClose={close} className="w-[360px]" space="large.eq" column>
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
      <Flex column className="gap-2"></Flex>
    </Modal>
  )
}
