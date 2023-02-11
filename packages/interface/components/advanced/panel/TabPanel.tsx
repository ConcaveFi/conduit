import React, {
  cloneElement,
  createContext,
  forwardRef,
  ReactComponentElement,
  useMemo,
  useState,
} from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'
import { Flex, FlexProps } from '../../primitives'
import { PanelAttributes } from './Panel'
import { PanelBody, PanelBodyProps } from './PanelBody'
import { PanelHeader, PanelHeaderProps } from './PanelHeader'
import { PanelWrapper } from './PanelWrapper'

export enum TabPanelDisplayNames {
  PANEL_SCREEN = 'Panel.Screen',
  PANEL_TAB = 'Panel.Tab',
  PANEL_ROOT = 'Panel.Root',
}

const TabPanelContext = createContext<{ test?: string }>({})
export interface TabPanelProps extends PrimitiveDivProps, PanelAttributes, PanelHeaderProps {
  bodyProps?: PanelBodyProps
  children: ReactComponentElement<React.FC<PanelTab>>[] | ReactComponentElement<React.FC<PanelTab>>
}
export function Root(props: TabPanelProps) {
  const [tab, setTab] = useState(0)
  const { size, variant = 'primary', children, bodyProps } = props

  const tabs = useMemo(() => {
    return React.Children.map(children, (c, i) => {
      if (c.type?.displayName !== TabPanelDisplayNames.PANEL_TAB) return null
      if (c.props.default) setTab(i)
      const children = c.props.children(i === tab) as JSX.Element
      const onClick = () => (children.props.onClick && children.props.onClick(), setTab(i))
      return cloneElement(children, { onClick })
    })
  }, [children, tab])

  const screens = useMemo(() => {
    const filtered = React.Children.toArray(children).filter((c) => {
      const el = c as JSX.Element
      return el.type.displayName === TabPanelDisplayNames.PANEL_SCREEN
    })
    return filtered.map((c, i) => {
      const el = c as JSX.Element
      if (tab !== i) return null
      return el.props.children(true)
    })
  }, [children, tab])
  return (
    <TabPanelContext.Provider value={{ test: 'Testando' }}>
      <PanelWrapper size={size} {...props}>
        <PanelHeader variant={variant}>
          <Flex className="gap-4">{tabs}</Flex>
        </PanelHeader>
        <PanelBody variant={variant} {...bodyProps}>
          {screens}
        </PanelBody>
      </PanelWrapper>
    </TabPanelContext.Provider>
  )
}
Root.displayName = TabPanelDisplayNames.PANEL_ROOT

interface PanelTab {
  default?: boolean
  children?: (selected?: boolean) => JSX.Element
}
const Tab: React.FC<PanelTab> = (props) => <></>
Tab.displayName = TabPanelDisplayNames.PANEL_TAB

type PanelScreen = {
  children: (isSelected?: boolean) => JSX.Element
}
export const Screen = forwardRef<HTMLDivElement, PanelScreen>((props, ref) => {
  return cloneElement(props.children(true), { ref })
})
Screen.displayName = TabPanelDisplayNames.PANEL_SCREEN

export const TabPanel = Object.assign({}, { Tab, Root, Screen })
