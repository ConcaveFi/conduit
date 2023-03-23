'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Modal, ModalProps } from '@tradex/interface'
import { queryClientAtom } from 'jotai-tanstack-query'
import { useHydrateAtoms } from 'jotai/utils'
import Image from 'next/image'
// import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Theme } from 'utils/themeHandler'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
import { IsHydratedProvider } from './IsHydratedProvider'
import { ThemeProvider } from './ThemeProvider'
import { WagmiProvider } from './WagmiProvider'

const _useLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  useHydrateAtoms([[queryClientAtom, queryClient]])

  _useLayoutEffect(() => {
    const storedTheme = Theme.getStoredTheme()
    const theme = storedTheme || Theme.defaultTheme
    Theme.toDOM(theme)
  }, [])

  const { chain } = useNetwork()
  const isOpen = useMemo(() => {
    if (!chain?.id) return false
    const supportedNetworks = [optimism.id, optimismGoerli.id]
    const includes = supportedNetworks.includes(chain.id)
    if (includes) return false
    return true
  }, [chain?.id])

  return (
    <IsHydratedProvider>
      <WagmiProvider>
        {/* <TranslationProvider> */}
        <QueryClientProvider client={queryClient}>
          <UnsupportedNetworkModal isOpen={isOpen} onClose={() => {}} />

          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
        {/* </TranslationProvider> */}
      </WagmiProvider>
    </IsHydratedProvider>
  )
}

function UnsupportedNetworkModal(props: ModalProps) {
  const { switchNetwork } = useSwitchNetwork()
  return (
    <Modal {...props}>
      <div className="` h-screen">
        <div className="card card-primary-outlined gap- mt-20 h-fit w-[450px] p-6">
          <span className="text-dark-accent ocean:text-blue-accent mx-auto text-xl ">
            Unsupported network
          </span>
          <span className="text-dark-30 ocean:text-blue-30 mx-auto text-lg">
            Please switch to optimism
          </span>
          <button
            className="btn btn-secondary centered mt-4 h-14 shadow-lg "
            onClick={() => switchNetwork?.(optimism.id)}
          >
            <Image
              src={'/assets/networks/optimism.png'}
              priority
              width={30}
              height={30}
              alt="op logo"
            />
            Switch to optimism
          </button>
        </div>
      </div>
    </Modal>
  )
}
