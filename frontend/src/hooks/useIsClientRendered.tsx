import { useEffect, useState } from 'react'

export function useIsClientRendered() {
  const [isClientRendered, setIsClientRendered] = useState(false)
  useEffect(() => setIsClientRendered(true), [])
  return isClientRendered
}
