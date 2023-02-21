import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { theadStyles } from '../../../styles/primitives/table/theadStyles'
import { PrimitiveTableSelectionProps } from '../../../types/primitives'

export type THeadAttributes = VariantProps<typeof theadStyles>
export interface THeadProps extends THeadAttributes, PrimitiveTableSelectionProps {}
export const THead = forwardRef<HTMLTableSectionElement, THeadProps>(
  ({ className, variant, ...props }, ref) => {
    className = theadStyles({ className, variant })
    return React.createElement('thead', { ref, className, ...props })
  },
)
