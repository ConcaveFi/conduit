import { useEffect, useState } from 'react'

export function useIsMounted() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => setIsOpen(true), [])
  return isOpen
}
