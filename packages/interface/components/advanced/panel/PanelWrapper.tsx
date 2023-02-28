import React, { forwardRef } from 'react'
import { DivProps } from '../../../types/primitives'

export interface PanelWrapperProps extends DivProps {}
export const PanelWrapper = forwardRef<HTMLDivElement, PanelWrapperProps>(
  ({ className, ...props }, ref) => {
    className = `flex flex-col ${className}`
    return React.createElement('div', { className, ref, ...props })
  },
) as React.FC<PanelWrapperProps>
