import { CloseIcon, ExpandIcon } from '@tradex/icons'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, ReactNode } from 'react'
import { PrimitiveDivProps } from '../../../types/primitives'
import { Button, Flex } from '../../primitives'

const baseStyles = cva('flex px-3 justify-between items-center w-full h-9')
export const panelHeaderStyles = cva(baseStyles(), {
  variants: {
    variant: {
      primary: ['bg-ocean-500 border-b-2 border-opacity-40 border-ocean-300'],
      secondary: ['bg-ocean-600 border-b-2 border-ocean-400'],
    },
  },
})
export type PanelHeaderAttributes = VariantProps<typeof panelHeaderStyles>
export interface PanelHeaderProps extends PanelHeaderAttributes, PrimitiveDivProps {
  children?: ReactNode
  onMaximize?: VoidFunction
  onClose?: VoidFunction
}
export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, variant, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        className={`${panelHeaderStyles({ variant })} cursor-move`}
        onMouseDown={(e) => e.preventDefault()}
        data-draggable="true"
        {...props}
      >
        {children}
        <Flex className="gap-3 z-20" align="center">
          <Button onClick={props.onMaximize}>
            <ExpandIcon className="w-4 h-4 fill-ocean-200" />
          </Button>
          <Button onClick={props.onClose}>
            <CloseIcon className="w-3 h-3 fill-ocean-200" />
          </Button>
        </Flex>
      </Flex>
    )
  },
) as React.FC<PanelHeaderProps>
