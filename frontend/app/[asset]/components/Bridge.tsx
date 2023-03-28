'use client'

import { Customize, WidgetProps } from '@socket.tech/plugin'
import { ChevronIcon } from '@tradex/icons'
import { atom, useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { useNetwork, useSigner } from 'wagmi'
import { useTheme } from '../../providers/ThemeProvider'

const DynamicComponent = dynamic(() => import('@socket.tech/plugin').then((mod) => mod.Bridge))

const baseTheme: Customize = {
  fontFamily: 'var(--font-sans)',
  responsiveWidth: true,
  borderRadius: 1,
}

const oceanTheme: Customize = {
  primary: 'rgb(18,15,58)',
  secondary: 'rgb(18,15,58)',
  text: 'rgb(254,254,254)',
  secondaryText: 'rgb(0,208,254)',
  accent: 'rgb(64,199,249)',
  onAccent: 'rgb(0,0,0)',
  interactive: 'rgb(15, 20, 66)',
  onInteractive: 'rgb(255,255,255)',
}

const darkTheme: Customize = {
  primary: 'rgb(21,23,32)',
  secondary: 'rgb(21,23,32)',
  text: 'rgb(254,254,254)',
  secondaryText: 'rgb(254,254,254)',
  accent: 'rgb(254,254,254)',
  onAccent: 'rgb(0,0,0)',
  interactive: 'rgb(47,49,62)',
  onInteractive: 'rgb(255,255,255)',
  fontFamily: 'var(--font-sans)',
}

export const sidebarOpen = atom(false)

export function Bridge(bridgeProps: Pick<WidgetProps, 'onSubmit' | 'onBridgeSuccess'>) {
  const { chain } = useNetwork()
  const signer = useSigner()
  const { theme } = useTheme()
  const [isOpen, setOpen] = useAtom(sidebarOpen)

  const handle = () => {
    setOpen((v) => !v)
  }

  const currentId = chain?.id || 10
  const defaultSourceToken = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  const defaultDestToken = '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9'
  const defaultSourceNetwork = currentId
  const defaultDestNetwork = currentId === 10 ? 1 : 10
  const selectedTheme = theme === 'dark' ? darkTheme : oceanTheme

  return (
    <div
      className={`transition-max-height overflow-y-hidden duration-500 ${
        isOpen ? 'max-h-screen' : 'max-h-8'
      }`}
    >
      <div
        onClick={handle}
        className="ocean:text-blue-accent hover:bg-dark-30 flex cursor-pointer items-center justify-between rounded-xl p-2 text-xs font-bold text-white"
      >
        <span>Bridge</span>
        <ChevronIcon
          className={`fill-dark-accent ocean:fill-blue-accent h-3 w-3 transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <div>
        <DynamicComponent
          API_KEY="645b2c8c-5825-4930-baf3-d9b997fcd88c"
          provider={signer.data?.provider}
          defaultSourceNetwork={defaultSourceNetwork}
          defaultDestNetwork={defaultDestNetwork}
          defaultSourceToken={defaultSourceToken}
          defaultDestToken={defaultDestToken}
          customize={{ ...baseTheme, ...selectedTheme }}
          {...bridgeProps}
        />
      </div>
    </div>
  )
}
