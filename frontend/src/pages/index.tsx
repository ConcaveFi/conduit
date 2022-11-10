import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { OrderBookWrapper } from '../components/OrderBook/OrderBookWrapper'
import { PlaceContainer } from '../components/PlaceContainer'
import { Topbar } from '../components/Topbar'
import { TopbarInfo } from '../components/TopbarInfo'
import { useIsMounted } from 'src/hooks/useIsMounted'
export default function Home() {
  const ref = useRef<HTMLDivElement>(null)

  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)

  useEffect(() => {
    setClientX(ref?.current?.clientWidth)
    setClientY(ref?.current?.clientHeight)
  }, [ref])

  const isMounted = useIsMounted()
  if (!isMounted) return <></>

  return (
    <div className="h-screen flex flex-col w-full bg-dark">
      <Topbar />
      <div className="flex w-full h-full">
        <div className="w-[80%] flex flex-col">
          <TopbarInfo />
          <div className="flex flex-1 ">
            <div className="flex-1 h-full border-l border-dark-700 flex flex-col">
              <div className="w-full flex flex-col flex-1 text-gray-100" ref={ref}></div>
              <div className="w-full h-10 border-t border-dark-700 "></div>

              <div className="w-full flex flex-col flex-[0.5]"> </div>
            </div>
            <OrderBookWrapper />
          </div>
        </div>
        <PlaceContainer />
      </div>
    </div>
  )
}
