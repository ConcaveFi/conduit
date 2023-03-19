import { VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { panelBodyStyles } from '../../../styles/advanced/panelStyles'
import { DivProps } from '../../../types/primitives'
import { PanelBody, PanelBodyProps } from './PanelBody'
import { PanelHeader, PanelHeaderProps } from './PanelHeader'
import { PanelWrapper } from './PanelWrapper'

export interface PanelEssentials {
  bodyProps?: PanelBodyProps
  headerProps?: PanelHeaderProps
  onMaximize?: VoidFunction
  onMinimize?: VoidFunction
  onClose?: VoidFunction
}
export type PanelAttributes = VariantProps<typeof panelBodyStyles>
export interface PanelProps extends DivProps, PanelHeaderProps, PanelAttributes, PanelEssentials {
  name?: string
  headerChild?: JSX.Element
}
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const {
    variant = 'primary',
    name,
    children,
    bodyProps,
    headerProps,
    onMaximize,
    onMinimize,
    onClose,
    headerChild,
    ...rest
  } = props
  return (
    <PanelWrapper ref={ref} {...rest}>
      <PanelHeader
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        {...headerProps}
      >
        {headerChild}
        <span className="text-dark-accent ocean:text-blue-accent text-xs ">{name}</span>
      </PanelHeader>
      <PanelBody variant={variant} {...bodyProps}>
        {children}
      </PanelBody>
    </PanelWrapper>
  )
}) as React.FC<PanelProps>
