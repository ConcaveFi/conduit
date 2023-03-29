import { ExchangeCard } from './components/SwapCard'

export default async function Exchange({ params }) {
  return (
    <div className=" flex w-full flex-col ">
      <div className="skeleton flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <ExchangeCard />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Exchange | Conduit',
  description: '', // TODO
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
  },
}
