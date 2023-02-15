import { forwardRef } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'
import { PanelHeader, PanelHeaderProps } from './PanelHeader'
import { Text } from '../../primitives'
import { PanelBody, PanelBodyProps } from './PanelBody'
import { PanelWrapper, wrapperSyles } from './PanelWrapper'
import { VariantProps } from 'class-variance-authority'

export type PanelAttributes = VariantProps<typeof wrapperSyles>
export interface PanelEssentials {
  bodyProps?: PanelBodyProps
  onMaximize?: VoidFunction
  onMinimize?: VoidFunction
  onClose?: VoidFunction
}
export interface PanelProps
  extends PrimitiveDivProps,
    PanelAttributes,
    PanelHeaderProps,
    PanelEssentials {
  name?: string
}
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const {
    variant = 'primary',
    name,
    children,
    bodyProps,
    size,
    onMaximize,
    onMinimize,
    onClose,
    ...rest
  } = props
  return (
    <PanelWrapper ref={ref} size={size} {...rest}>
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
