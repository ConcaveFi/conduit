import { forwardRef } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'
import { PanelHeader, PanelHeaderProps } from './PanelHeader'
import { Text } from '../../primitives'
import { PanelBody, PanelBodyProps } from './PanelBody'
import { PanelWrapper } from './PanelWrapper'
import { VariantProps } from 'class-variance-authority'

export interface PanelEssentials {
  bodyProps?: PanelBodyProps
  onMaximize?: VoidFunction
  onMinimize?: VoidFunction
  onClose?: VoidFunction
}
export interface PanelProps extends PrimitiveDivProps, PanelHeaderProps, PanelEssentials {
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
