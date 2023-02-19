import { Button, ButtonProps, Flex } from '@tradex/interface'
import React, { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export interface TabProps {
  children: ReactElement<TabButton> | ReactElement<TabButton>[]
  onChange: (tab: number) => void
}
export function Tab({ children, onChange }: TabProps) {
  const [curTab, setTab] = useState(0)
  useEffect(() => onChange(curTab), [curTab])
  const ref = useRef<HTMLDivElement>(null)
  const tabs = useMemo(
    () =>
      React.Children.map(children, (tab, index) => {
        if (index === 0 && !curTab) setTab(0)
        if (tab.props.children) {
          return tab.props.children(curTab == index)
        }
        return <></>
      }),
    [curTab, children],
  )
  useEffect(() => {
    if (!ref.current) return
    for (let i = 0; i < ref.current.childNodes.length; i++) {
      const child = ref.current.childNodes[i] as HTMLButtonElement
      child.onclick = () => setTab(i)
    }
  }, [ref, children])

  return (
    <Flex ref={ref} className="w-full bg-ocean-600 h-12 p-1 rounded-full">
      {tabs}
    </Flex>
  )
}
interface TabButton {
  children?: (selected?: boolean) => JSX.Element
}
const TabButton: React.FC<TabButton> = (props) => <></>
Tab.Button = TabButton
