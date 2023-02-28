import { Popover as PrimitivePopover, Transition } from '@headlessui/react'
import { VariantProps } from 'class-variance-authority'
import { forwardRef, Fragment } from 'react'
import { propoverPanelStyles } from '../../styles/advanced/popoverStyles'
import { ButtonProps } from '../../types/primitives'
import { FlexProps } from '../primitives'
import { Card, CardProps } from './Card'

export function Popover({ className, ...props }: FlexProps) {
  return <PrimitivePopover className={`relative z-[10] ${className}`} as={'div'} {...props} />
}

const PopButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <PrimitivePopover.Button as={'button'} {...props} ref={ref} />
})

const Panel = forwardRef<HTMLDivElement, CardProps & VariantProps<typeof propoverPanelStyles>>(
  ({ className, origin, ...props }, ref) => {
    return (
      <Transition
        as={Fragment}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-300 ease-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <PrimitivePopover.Panel
          className={propoverPanelStyles({ className, origin })}
          {...props}
          as={Card}
          ref={ref}
        />
      </Transition>
    )
  },
)
Popover.Button = PopButton
Popover.Panel = Panel
