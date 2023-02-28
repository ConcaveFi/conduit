import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { containerStyles } from '../../styles/primitives/containerStyles'
import { PrimitiveDivProps } from '../../types/primitives'

export type ContainerAttributes = VariantProps<typeof containerStyles>
export interface ContainerProps extends PrimitiveDivProps, ContainerAttributes {}
export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { space, expand, className = '', ...flexProps } = props
  const styles = containerStyles({ space, expand, className })
  return React.createElement('div', { ...flexProps, className: styles, ref })
}) as React.FC<ContainerProps>
