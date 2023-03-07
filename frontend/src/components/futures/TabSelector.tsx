import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'

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
    <div ref={ref} className="bg-ocean-600 flex h-12 w-full rounded-full p-1">
      {tabs}
    </div>
  )
}
interface TabButton {
  children?: (selected?: boolean) => JSX.Element
}
const TabButton: React.FC<TabButton> = (props) => <></>
Tab.Button = TabButton