import { CloseIcon } from '@tradex/icons'
import { ReactNode, forwardRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { panelHeaderStyles } from '../../../styles/advanced/panelStyles'
import { DivProps } from '../../../types/primitives'
export type PanelHeaderProps = {
  children?: ReactNode
  onMaximize?: VoidFunction
  onClose?: VoidFunction
  onMinimize?: VoidFunction
} & DivProps
export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, onMaximize, onClose, onMinimize, className, ...props }, ref) => {
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
    className = twMerge(panelHeaderStyles, 'cursor-move', className)
    return (
      <div
        ref={ref}
        className={className}
        onMouseDown={(e) => e.preventDefault()}
        data-draggable="true"
        {...props}
      >
        {children}
        <div className="right-3 z-10 flex items-center gap-3">
          {/* <button onMouseDown={(e) => e.stopPropagation()} onClick={handleToggle}>
            <ExpandIcon className="fill-dark-accent ocean:fill-blue-accent box-3" />
          </button> */}
          <button onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
            <CloseIcon className="stroke-dark-accent ocean:fill-blue-accent box-2.5 " />
          </button>
        </div>
      </div>
    )
  },
) as React.FC<PanelHeaderProps>
