import { Popover as PrimitivePopover, Transition } from '@headlessui/react'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, Fragment } from 'react'
import { Button, ButtonProps, Flex, FlexProps } from '../primitives'
import { Card, CardProps } from './Card'

export function Popover({ className, ...props }: FlexProps) {
  return <PrimitivePopover className={`z-[100] relative ${className}`} as={Flex} {...props} />
}

const PopButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <PrimitivePopover.Button as={Button} {...props} ref={ref} />
})

export const panelStyles = cva(cva('absolute mt-2 top-full')(), {
  variants: {
    origin: {
      top: 'origin-top',
      'top-right': 'origin-top-right',
      'top-left': 'origin-top-left',
      center: 'origin-center',
    },
  },
  defaultVariants: {
    origin: 'top',
  },
})

const Panel = forwardRef<HTMLDivElement, CardProps & VariantProps<typeof panelStyles>>(
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
          className={panelStyles({ className, origin })}
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
