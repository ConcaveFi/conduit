import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'

const baseBodyStyles = cva(['flex flex-col flex-grow'])
export const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 '],
      secondary: ['bg-ocean-700'],
    },
    spacing: {
      sm: 'gap-2 p-2',
      md: 'gap-4 p-5',
      none: '',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})
export type PanelBodyAttributes = VariantProps<typeof panelBodyStyles>
export interface PanelBodyProps extends PanelBodyAttributes, PrimitiveDivProps {}
export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ variant, className, spacing, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={`${panelBodyStyles({ variant, spacing, className })}`} />
    )
  },
) as React.FC<PanelBodyProps>
