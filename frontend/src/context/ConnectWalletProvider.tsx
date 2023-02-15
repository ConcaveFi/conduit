import { createContext, PropsWithChildren, useContext } from 'react'
import { ConnectModal } from 'src/components/wallet/ConnectModal'
import { useDisclosure } from 'src/hooks/useDisclosure'

const ConnectWalletContext = createContext<{
  isOpen: boolean
  open: VoidFunction
  close: VoidFunction
}>({
  isOpen: true,
  close: () => {},
  open: () => {},
})

export function ConnectWalletProvider({ children }: PropsWithChildren) {
  const { isOpen, onClose: close, onOpen: open } = useDisclosure()
  return (
    <ConnectWalletContext.Provider value={{ close, isOpen, open }}>
      <ConnectModal />
      {children}
    </ConnectWalletContext.Provider>
  )
}

export const useConnectWallet = () => useContext(ConnectWalletContext)
