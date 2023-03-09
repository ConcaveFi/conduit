import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { panelBodyStyles } from '../../../styles/advanced/panelStyles'
import { DivProps } from '../../../types/primitives'

export type PanelBodyAttributes = VariantProps<typeof panelBodyStyles>
export interface PanelBodyProps extends PanelBodyAttributes, DivProps {}
export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ variant, className, spacing, ...props }, ref) => {
    className = twMerge(panelBodyStyles({ variant, spacing }), className)
    return React.createElement('div', { className, ...props, ref })
  },
) as React.FC<PanelBodyProps>
