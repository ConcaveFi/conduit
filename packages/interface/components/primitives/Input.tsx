import { VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { inputStyles } from '../../styles/primitives/inputStyles'
import { PrimitiveInputProps } from '../../types/primitives'

export type InputAttributes = VariantProps<typeof inputStyles>
export interface InputProps extends InputAttributes, PrimitiveInputProps {}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variant, className, type = 'text', ...inputProps } = props
  const _styles = inputStyles({ className, variant })
  return React.createElement('input', { type, ref, className: _styles, ...inputProps })
})
