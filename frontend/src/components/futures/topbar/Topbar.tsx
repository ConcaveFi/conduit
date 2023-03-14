import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useModalState } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalContext'
import { ChevronIcon, NotificationIcon } from '@tradex/icons'
import { Modal } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import Image from 'next/image'
import { ExchangeCard } from 'src/components/swap/SwapCard'
import { useQueryModal } from 'src/utils/enum/urlModal'
import { truncateAddress } from 'src/utils/truncateAddress'
import { useAccount, useBalance } from 'wagmi'
import { LocationSelector } from './LocationSelector'
import { ThemeSelector } from './ThemeSelector'

export function Topbar() {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { address } = useAccount()
  const { data } = useBalance({ address })
  const swapModal = useQueryModal({
    modalType: 'swap',
  })
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center h-full gap-2">
        <Image
          priority
          src={'/assets/conduit.svg'}
          className="w-[160px]"
          alt="logo"
          width={10}
          height={10}
        />

        <button className="btn btn-underline centered ml-6 px-5 font-medium h-full text-xs rounded-none">
          {t('dashboard')}
        </button>
        <button className="btn btn-bottom-glow  centered  px-5 font-medium h-full text-xs rounded-none">
          {t('futures')}
        </button>
        <button
          onClick={swapModal.onOpen}
          className="btn btn-underline centered px-5 font-medium h-full text-xs rounded-none"
        >
          Swap
        </button>
        <button className="btn btn-underline centered px-5 font-medium h-full text-xs  rounded-none">
          Leaderboard
        </button>
      </div>
      <div className="flex w-fit items-center gap-3 ">
        <LocationSelector />
        <ThemeSelector />

        <NotificationIcon className="fill-ocean-200 box-4" />
        <ConnectButton.Custom>
          {({ chain, openAccountModal, openChainModal, openConnectModal, account }) => {
            if (!isConnected) {
              return (
                <button onClick={openConnectModal} className="btn btn-green-gradient py-2">
                  Connect wallet
                </button>
              )
            }
            return (
              <>
                <button
                  onClick={openChainModal}
                  className="btn btn-underline text-xs centered gap-2"
                >
                  {chain?.name}
                  <ChevronIcon className="fill-ocean-200 h-3 w-3" />
                </button>
                <button className="btn btn-underline text-xs" onClick={openAccountModal}>
                  {truncateAddress(account?.address)}
                </button>
              </>
            )
          }}
        </ConnectButton.Custom>
      </div>
      <Modal isOpen={swapModal.isOpen} onClose={swapModal.onClose}>
        <ExchangeCard />
      </Modal>
    </div>
  )
}
