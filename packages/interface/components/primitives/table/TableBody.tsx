import { VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { tbodyStyles } from '../../../styles/primitives/table/tbodyStyles'
import { PrimitiveTableSelectionProps } from '../../../types/primitives'

export type TableBodyAttributes = VariantProps<typeof tbodyStyles>
export interface TableBodyProps extends TableBodyAttributes, PrimitiveTableSelectionProps {}
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  return <tbody ref={ref} {...props} />
})
