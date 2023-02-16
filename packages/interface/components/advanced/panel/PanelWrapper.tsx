import React, { forwardRef } from 'react'
import { Flex, FlexProps } from '../../primitives'

const DEFAULT_STYLES = 'rounded-lg overflow-hidden'
export interface PanelWrapperProps extends FlexProps {}
export const PanelWrapper = forwardRef<HTMLDivElement, PanelWrapperProps>(
  ({ className, ...props }, ref) => {
    const _styles = `${DEFAULT_STYLES} ${className}`
    return React.createElement(Flex, { column: true, ref, className: _styles, ...props })
  },
) as React.FC<PanelWrapperProps>
