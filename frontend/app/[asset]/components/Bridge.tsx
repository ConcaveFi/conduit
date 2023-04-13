'use client'
import { Customize, WidgetProps } from '@socket.tech/plugin'
import { ChevronIcon } from '@tradex/icons'
import { bridgeChains } from 'app/providers/wagmi-config'
import { atom, useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useNetwork, useSigner } from 'wagmi'
import { useTheme } from '../../providers/ThemeProvider'
const SocketBridge = dynamic(() => import('@socket.tech/plugin').then((mod) => mod.Bridge))
const SOCKET_PLUGIN_KEY = process.env.SOCKET_PLUGIN_KEY || ''
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
  const selectedTheme = theme === 'dark' ? darkTheme : oceanTheme
  useEffect(() => {
    signer.data?.provider?.getNetwork().then(console.log)
  }, [])
  return (
    <div
      className={`transition-max-height overflow-y-hidden duration-500 ${
        isOpen ? 'max-h-screen' : 'max-h-8'
      }`}
    >
      <div
        onClick={handle}
        className="flex items-center justify-between p-2 text-xs font-bold text-white cursor-pointer ocean:text-blue-accent hover:bg-dark-30 rounded-xl"
      >
        <span>Bridge</span>
        <ChevronIcon
          className={`fill-dark-accent ocean:fill-blue-accent h-3 w-3 transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <div>
        {isOpen && (
          <SocketBridge
            API_KEY={SOCKET_PLUGIN_KEY}
            provider={signer.data?.provider}
            sourceNetworks={bridgeChains.map((b) => b.id)}
            destNetworks={bridgeChains.map((b) => b.id)}
            customize={{ ...baseTheme, ...selectedTheme }}
            {...bridgeProps}
          />
        )}
      </div>
    </div>
  )
}
