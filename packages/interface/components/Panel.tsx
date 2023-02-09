import { forwardRef, LegacyRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { PrimitiveDivProps } from '../types/primitives'
import { CloseIcon, ExpandIcon } from '@tradex/icons'

const panelHeaderStyles = cva(cva('flex px-3 justify-between items-center w-full h-9')(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 border-b-2 border-opacity-40 border-ocean-300'],
      secondary: ['bg-ocean-700 border-b-2 border-ocean-400'],
    },
  },
})
const baseBodyStyles = cva(['flex flex-col gap-4 p-4 w-full h-full'])
const panelBodyStyles = cva(baseBodyStyles(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 '],
      secondary: ['bg-ocean-600'],
    },
  },
})
const wrapperSyles = cva(cva('rounded-lg overflow-hidden ')(), {
  variants: {
    size: {
      '16:9': 'w-[600px] h-[300px]',
    },
  },
})

export type PanelAttributes = {
  name: string
  bodyProps?: PrimitiveDivProps
} & VariantProps<typeof panelBodyStyles> &
  VariantProps<typeof wrapperSyles>
export interface PanelProps extends PrimitiveDivProps, PanelAttributes {}

export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { variant = 'primary', name, className, children, bodyProps, size } = props
  return (
    <div ref={ref} className={`${wrapperSyles({ className, size })}`}>
      <div className={`${panelHeaderStyles({ variant })}`}>
        <span className="text-xs text-ocean-200">{name}</span>
        <div className="flex gap-3 items-center">
          <ExpandIcon className="w-4 h-4 fill-ocean-200" />
          <CloseIcon className="w-3 h-3 fill-ocean-200" />
        </div>
      </div>
      <div
        {...bodyProps}
        className={` ${panelBodyStyles({ variant, className: bodyProps?.className })}`}
      >
        {children}
      </div>
    </div>
  )
})
