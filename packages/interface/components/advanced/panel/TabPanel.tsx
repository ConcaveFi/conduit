import React, { cloneElement, forwardRef, ReactComponentElement, useMemo, useState } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'
import { PanelEssentials } from './Panel'
import { PanelBody } from './PanelBody'
import { PanelHeader, PanelHeaderProps } from './PanelHeader'
import { PanelWrapper } from './PanelWrapper'

export enum TabPanelDisplayNames {
  PANEL_SCREEN = 'Panel.Screen',
  PANEL_TAB = 'Panel.Tab',
  PANEL_ROOT = 'Panel.Root',
}
export interface TabPanelProps extends PrimitiveDivProps, PanelEssentials, PanelHeaderProps {
  children: any
}
export const Root = forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const [tab, setTab] = useState(0)
  const {
    variant = 'primary',
    children,
    bodyProps,
    onMaximize,
    onMinimize,
    onClose,
    ...rest
  } = props

  const tabs = useMemo(() => {
    return React.Children.map(children, (c, i) => {
      if (c.type?.displayName !== TabPanelDisplayNames.PANEL_TAB) return null
      const element = c as ReactComponentElement<React.FC<PanelTab>>

      if (element.props.default) setTab(i)
      if (typeof element.props?.children !== 'function') return <></>
      const children = element.props.children(i === tab) as JSX.Element
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
      const el = c as ReactComponentElement<React.FC<PanelScreen>>
      if (tab !== i) return null
      return typeof el.props.children === 'function' ? el.props.children(true) : el.props.children
    })
  }, [children, tab])
  return (
    <PanelWrapper {...rest} ref={ref}>
      <PanelHeader
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        variant={variant}
      >
        <div className="flex gap-4">{tabs}</div>
      </PanelHeader>
      <PanelBody variant={variant} {...bodyProps}>
        {screens}
      </PanelBody>
    </PanelWrapper>
  )
})
Root.displayName = TabPanelDisplayNames.PANEL_ROOT

interface PanelTab {
  default?: boolean
  children?: (selected?: boolean) => JSX.Element
}
const Tab: React.FC<PanelTab> = (props) => <></>
Tab.displayName = TabPanelDisplayNames.PANEL_TAB

type PanelScreen = {
  children: JSX.Element | ((isSelected?: boolean) => JSX.Element)
}
export const Screen = forwardRef<HTMLDivElement, PanelScreen>((props, ref) => {
  const el = typeof props.children === 'function' ? props.children() : props.children
  return cloneElement(el, { ref })
})
Screen.displayName = TabPanelDisplayNames.PANEL_SCREEN

export const TabPanel = Object.assign({}, { Tab, Root, Screen })
