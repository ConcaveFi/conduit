import React, { ForwardedRef, forwardRef } from 'react'
import { PrimitiveTRProps } from '../../../types/primitives'

type ModifiedTRProps = Omit<PrimitiveTRProps, 'children'>
export interface TableRowProps<P extends Readonly<string>> extends ModifiedTRProps {
  children(element: P, index: number): JSX.Element
  rows: Readonly<P[]>
}

export function TableRow<P extends Readonly<string>>({ children, ...props }: TableRowProps<P>) {
  const tableRows = props.rows.map(children)
  const tableDatas = tableRows.map((element) => React.createElement('td', {}, element))
  return React.createElement('tr', { ...props, children: tableDatas })
}
