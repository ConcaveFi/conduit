import { VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { buttonStyles } from '../../styles/primitives/buttonStyles'
import { PrimitiveButtonProps } from '../../types/primitives'

export type ButtonAttributes = VariantProps<typeof buttonStyles>
export interface ButtonProps extends PrimitiveButtonProps, ButtonAttributes {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, size, className, centered, ...buttonProps } = props
  return (
    <button
      ref={ref}
      className={buttonStyles({ className, size, centered, variant })}
      {...buttonProps}
    />
  )
}) as React.FC<ButtonProps>
