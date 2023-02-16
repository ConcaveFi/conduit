import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { containerStyles } from '../../styles/primitives/containerStyles'
import { PrimitiveDivProps } from '../../types/primitives'
import { Flex, FlexAttributes } from './Flex'

export type ContainerAttributes = VariantProps<typeof containerStyles>
export interface ContainerProps extends PrimitiveDivProps, FlexAttributes, ContainerAttributes {}
export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { space, expand, className = '', ...flexProps } = props
  const styles = containerStyles({ space, expand, className })
  return React.createElement(Flex, { ...flexProps, className: styles, ref })
}) as React.FC<ContainerProps>
