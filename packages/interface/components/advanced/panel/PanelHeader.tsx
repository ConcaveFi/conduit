import { CloseIcon, ExpandIcon } from '@tradex/icons'
import { VariantProps } from 'class-variance-authority'
import { forwardRef, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { panelHeaderStyles } from '../../../styles/advanced/panelStyles'
import { DivProps } from '../../../types/primitives'
export type PanelHeaderAttributes = VariantProps<typeof panelHeaderStyles>
export type PanelHeaderProps = {
  children?: ReactNode
  onMaximize?: VoidFunction
  onClose?: VoidFunction
  onMinimize?: VoidFunction
} & PanelHeaderAttributes &
  DivProps
export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, variant, onMaximize, onClose, onMinimize, className, ...props }, ref) => {
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
    className = twMerge(panelHeaderStyles({ variant }), 'cursor-move', className)
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
          <button onMouseDown={(e) => e.stopPropagation()} onClick={handleToggle}>
            <ExpandIcon className="fill-light-400 ocean:fill-ocean-200 box-3" />
          </button>
          <button onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
            <CloseIcon className="fill-light-400 ocean:fill-ocean-200 box-[0.65rem]" />
          </button>
        </div>
      </div>
    )
  },
) as React.FC<PanelHeaderProps>
