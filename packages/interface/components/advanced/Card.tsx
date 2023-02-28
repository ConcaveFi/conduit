import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { cardStyles } from '../../styles/advanced/cardStyles'
import { DivProps } from '../../types/primitives'

export type CardAttributes = VariantProps<typeof cardStyles>
export interface CardProps extends CardAttributes, DivProps {}
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, variant, ...containerProps } = props
  const _styles = cardStyles({ className, variant })
  return React.createElement('div', { className: _styles, ref, ...containerProps })
}) as React.FC<CardProps>
