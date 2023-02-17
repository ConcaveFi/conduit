import { CloseIcon, ExpandIcon } from '@tradex/icons'
import { VariantProps } from 'class-variance-authority'
import { forwardRef, ReactNode, useState } from 'react'
import { panelHeaderStyles } from '../../../styles/advanced/panelStyles'
import { PrimitiveDivProps } from '../../../types/primitives'
import { Button, Flex } from '../../primitives'
import { Tooltip } from '../Tooltip'

export type PanelHeaderAttributes = VariantProps<typeof panelHeaderStyles>
export interface PanelHeaderProps extends PanelHeaderAttributes, PrimitiveDivProps {
  children?: ReactNode
  onMaximize?: VoidFunction
  onClose?: VoidFunction
  onMinimize?: VoidFunction
}
export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, variant, onMaximize, onClose, onMinimize, ...props }, ref) => {
    const [isFull, setIsFull] = useState(false)
    function handleToggle() {
      if (isFull && onMinimize) {
        setIsFull(false)
        onMinimize()
      } else if (!isFull && onMaximize) {
        setIsFull(true)
        onMaximize()
      }
    }
    return (
      <Flex
        ref={ref}
        className={`${panelHeaderStyles({ variant })} cursor-move`}
        onMouseDown={(e) => e.preventDefault()}
        data-draggable="true"
        {...props}
      >
        {children}
        <Flex className="gap-3 z-20 " align="center">
          <Tooltip
            info={isFull ? 'Minimize screen' : 'Maximize screen'}
            infoProps={{ className: 'w-[130px]' }}
          >
            <Button onMouseDown={(e) => e.stopPropagation()} onClick={handleToggle}>
              <ExpandIcon className="w-4 h-4 fill-ocean-200" />
            </Button>
          </Tooltip>
          <Tooltip info={'Remove widget'} infoProps={{ className: 'w-[130px]' }}>
            <Button onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
              <CloseIcon className="w-3 h-3 fill-ocean-200" />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    )
  },
) as React.FC<PanelHeaderProps>
