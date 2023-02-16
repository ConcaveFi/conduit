import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { cardStyles } from '../../styles/advanced/cardStyles'
import { Container, ContainerProps, Flex } from '../primitives'

export type CardAttributes = VariantProps<typeof cardStyles>
export interface CardProps extends CardAttributes, ContainerProps {}
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, variant, ...containerProps } = props
  const _styles = cardStyles({ className, variant })
  return React.createElement(Container, { className: _styles, ref, ...containerProps })
}) as React.FC<CardProps>
