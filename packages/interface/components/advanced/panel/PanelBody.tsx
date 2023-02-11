import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'

const baseBodyStyles = cva(['flex flex-col gap-4 p-4 w-full h-full'])
export const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 '],
      secondary: ['bg-ocean-600'],
    },
  },
})
export type PanelBodyAttributes = VariantProps<typeof panelBodyStyles>
export interface PanelBodyProps extends PanelBodyAttributes, PrimitiveDivProps {}
export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ variant, className, ...props }, ref) => {
    return <div ref={ref} {...props} className={` ${panelBodyStyles({ variant, className })}`} />
  },
) as React.FC<PanelBodyProps>
