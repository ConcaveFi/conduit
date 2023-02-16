import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'

export const wrapperSyles = cva(cva('flex flex-col rounded-lg overflow-hidden ')(), {
  variants: {
    size: {
      '16:9': 'w-[600px] h-[300px]',
    },
  },
})
export type PanelWrapperAttributes = VariantProps<typeof wrapperSyles>
export interface PanelWrapperProps extends PanelWrapperAttributes, PrimitiveDivProps {}
export const PanelWrapper = forwardRef<HTMLDivElement, PanelWrapperProps>(
  ({ size, className, ...props }, ref) => {
    return <div ref={ref} className={`${wrapperSyles({ className, size })}`} {...props} />
  },
) as React.FC<PanelWrapperProps>
