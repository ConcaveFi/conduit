import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { panelBodyStyles } from '../../../styles/advanced/panelStyles'
import { PrimitiveDivProps } from '../../../types/primitives'

export type PanelBodyAttributes = VariantProps<typeof panelBodyStyles>
export interface PanelBodyProps extends PanelBodyAttributes, PrimitiveDivProps {}
export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ variant, className, spacing, ...props }, ref) => {
    className = panelBodyStyles({ variant, spacing, className })
    return React.createElement('div', { className, ...props, ref })
  },
) as React.FC<PanelBodyProps>
