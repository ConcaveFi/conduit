import React, { forwardRef } from 'react'
import { Flex, FlexProps } from '../../primitives'

export interface PanelWrapperProps extends FlexProps {}
export const PanelWrapper = forwardRef<HTMLDivElement, PanelWrapperProps>(({ ...props }, ref) => {
  return React.createElement(Flex, { column: true, ref, ...props })
}) as React.FC<PanelWrapperProps>
