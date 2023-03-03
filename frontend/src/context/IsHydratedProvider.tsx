import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

const IsHydratedContext = createContext(false)

const useEffectFn = typeof document === 'undefined' ? useEffect : useLayoutEffect

export const IsHydratedProvider = ({ children }: PropsWithChildren) => {
  const [isHydrated, setIsHydrated] = useState(false)
  useEffectFn(() => setIsHydrated(true), [])
  return <IsHydratedContext.Provider value={isHydrated}>{children}</IsHydratedContext.Provider>
}

export const useIsHydrated = () => useContext(IsHydratedContext)
