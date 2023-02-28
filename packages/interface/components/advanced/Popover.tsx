import { Popover as PrimitivePopover, Transition } from '@headlessui/react'
import { forwardRef, Fragment } from 'react'
import { ButtonProps, DivProps } from '../../types/primitives'

export function Popover({ className, ...props }: DivProps) {
  return <PrimitivePopover className={`relative z-[10] ${className}`} as={'div'} {...props} />
}

const PopButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <PrimitivePopover.Button as={'button'} {...props} ref={ref} />
})

const Panel = forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => {
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
        className={`absolute top-full mt-2 ${className}`}
        {...props}
        as={'div'}
        ref={ref}
      />
    </Transition>
  )
})
Popover.Button = PopButton
Popover.Panel = Panel
