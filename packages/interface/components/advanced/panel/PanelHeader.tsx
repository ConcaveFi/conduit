import { CloseIcon, ExpandIcon } from '@tradex/icons'
import { VariantProps } from 'class-variance-authority'
import { forwardRef, ReactNode, useState } from 'react'
import { panelHeaderStyles } from '../../../styles/advanced/panelStyles'
import { DivProps } from '../../../types/primitives'
export type PanelHeaderAttributes = VariantProps<typeof panelHeaderStyles>
export interface PanelHeaderProps extends PanelHeaderAttributes, DivProps {
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
      <div
        ref={ref}
        className={`${panelHeaderStyles({ variant })} cursor-move`}
        onMouseDown={(e) => e.preventDefault()}
        data-draggable="true"
        {...props}
      >
        {children}
        <div className="right-3 z-10 flex items-center gap-3">
          <button onMouseDown={(e) => e.stopPropagation()} onClick={handleToggle}>
            <ExpandIcon className="fill-ocean-200 h-4 w-4" />
          </button>
          <button onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
            <CloseIcon className="fill-ocean-200 h-3 w-3" />
          </button>
        </div>
      </div>
    )
  },
) as React.FC<PanelHeaderProps>
