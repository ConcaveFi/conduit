import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    <div className="h-screen flex flex-col w-full bg-ocean-900">
      <span className="text-white"></span>
    </div>
  )
}
