import { VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { panelBodyStyles } from '../../../styles/advanced/panelStyles'

export type PanelBodyAttributes = VariantProps<typeof panelBodyStyles>

export type PanelBodyProps = PanelBodyAttributes & ComponentPropsWithoutRef<'div'>

export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ variant, className, spacing, ...props }, ref) => {
    className = twMerge(panelBodyStyles({ variant, spacing }), className)
    return <div className={className} ref={ref} {...props} />
  },
)
