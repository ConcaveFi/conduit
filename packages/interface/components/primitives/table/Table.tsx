import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { tableStyles } from '../../../styles/primitives/table/tableStyles'
import { PrimitiveTableProps } from '../../../types/primitives'

export type TableAttributes = VariantProps<typeof tableStyles>
export interface TableProps extends TableAttributes, PrimitiveTableProps {}
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, left, right, center, justify, ...props }, ref) => {
    className = tableStyles({ center, className, justify, left, right })
    return React.createElement('table', { className, ...props, ref })
  },
)
