import { useEffect, useRef, useState } from 'react'

export function useResizeObserver<T extends HTMLElement | null>(
  callback?: (e: ResizeObserverEntry[]) => void,
) {
  const [element, setElement] = useState<T>()
  const [observer, setObserver] = useState<ResizeObserver>()
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new ResizeObserver((e) => (callback?.(e), setElement(e[0].target as T)))
    obs.observe(ref.current)
    setObserver(obs)
  }, [callback])

  return {
    width: element?.clientWidth || 0,
    height: element?.clientHeight || 0,
    element,
    observer,
    ref,
  }
}
