import { PropsWithChildren } from 'react'
import { Topbar } from 'src/components/futures/topbar/Topbar'
import AppProviders from './providers'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <AppProviders>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        {children}
      </div>
    </AppProviders>
  )
}
