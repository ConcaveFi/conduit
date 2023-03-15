import { PropsWithChildren } from 'react'
import { Topbar } from './components/topbar/Topbar'
import { PageTitleWithPrice } from './PageTitleWithPrice'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageTitleWithPrice />
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        {children}
      </div>
    </>
  )
}
