import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

const IsHydratedContext = createContext(false)

export const IsHydratedProvider = ({ children }: PropsWithChildren) => {
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return <IsHydratedContext.Provider value={isHydrated}>{children}</IsHydratedContext.Provider>
}

export const useIsHydrated = () => useContext(IsHydratedContext)
