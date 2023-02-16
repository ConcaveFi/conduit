import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { textStyles } from '../../styles/primitives/textStyles'
import { PrimitiveSpanProps } from '../../types/primitives'

export type TextAttributes = VariantProps<typeof textStyles>
export interface TextProps extends TextAttributes, PrimitiveSpanProps {}
export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { variant, className, modifier, size, weight, ...spanProps } = props
  const _styles = textStyles({ className, variant, modifier, size, weight })
  return React.createElement('span', { ref, className: _styles, ...spanProps })
})
