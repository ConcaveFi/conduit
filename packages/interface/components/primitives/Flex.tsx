import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { flexStyles } from '../../styles/primitives/flexStyles'
import { PrimitiveDivProps } from '../../types/primitives'

export type FlexAttributes = VariantProps<typeof flexStyles>
export interface FlexProps extends PrimitiveDivProps, FlexAttributes {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { row, column, centered, grow, justify, align, className = '', ...divProps } = props
  const _styles = flexStyles({ align, centered, className, column, grow, justify, row })
  if (props.hidden) return <React.Fragment />
  return React.createElement('div', { ...divProps, ref, className: _styles })
}) as React.FC<FlexProps>
