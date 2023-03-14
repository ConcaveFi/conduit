import { PropsWithChildren } from 'react'
import { Topbar } from './components/topbar/Topbar'
import { PageTitleWithPrice } from './PageTitleWithPrice'
import AppProviders from './providers'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <AppProviders>
      <PageTitleWithPrice />
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        {children}
      </div>
    </AppProviders>
  )
}
