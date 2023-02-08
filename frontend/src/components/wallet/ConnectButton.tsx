import { Button } from '@exchange/interface'
import { useConnectWallet } from 'src/context/ConnectWalletProvider'

export function ConnectButton() {
  const { isOpen, open } = useConnectWallet()
  console.log(isOpen)
  return (
    <Button onClick={open} variant="green-gradient" size="lg" className="py-2 px-8">
      Connect Wallet
    </Button>
  )
}
