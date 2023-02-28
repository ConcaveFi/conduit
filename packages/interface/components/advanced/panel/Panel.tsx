import { forwardRef } from 'react'
import { DivProps } from '../../../types/primitives'
import { Text } from '../../primitives'
import { PanelBody, PanelBodyProps } from './PanelBody'
import { PanelHeader, PanelHeaderProps } from './PanelHeader'
import { PanelWrapper } from './PanelWrapper'

export interface PanelEssentials {
  bodyProps?: PanelBodyProps
  onMaximize?: VoidFunction
  onMinimize?: VoidFunction
  onClose?: VoidFunction
}
export interface PanelProps extends DivProps, PanelHeaderProps, PanelEssentials {
  name?: string
}
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const {
    variant = 'primary',
    name,
    children,
    bodyProps,
    onMaximize,
    onMinimize,
    onClose,
    ...rest
  } = props
  return (
    <PanelWrapper ref={ref} {...rest}>
      <PanelHeader
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        variant={variant}
      >
        <Text size="xs" variant="medium">
          {name}
        </Text>
      </PanelHeader>
      <PanelBody variant={variant} {...bodyProps}>
        {children}
      </PanelBody>
    </PanelWrapper>
  )
}) as React.FC<PanelProps>
