import { useState } from 'react'

interface UseDisclosure {
  defaultState?: boolean
}
export function useDisclosure(props?: UseDisclosure) {
  const [isOpen, setIsOpen] = useState(Boolean(props?.defaultState))
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen(!isOpen)
  return { isOpen, onClose, onOpen, onToggle }
}
