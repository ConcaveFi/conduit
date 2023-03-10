import { Menu as PrimitiveMenu, Transition } from '@headlessui/react'
import React, { forwardRef, Fragment } from 'react'
import { ButtonProps, DivProps } from '../../types/primitives'

export function Menu({ ...props }: DivProps) {
  props.className = `relative z-10 ${props.className}`
  // @ts-ignore headlessui types not good
  return React.createElement(PrimitiveMenu, { ...props })
}

const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // @ts-ignore
  return <PrimitiveMenu.Button as={'button'} ref={ref} {...props} />
})

const MenuItems = forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => {
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
      <PrimitiveMenu.Items
        className={`absolute top-full mt-2 ${className}`}
        {...props}
        as={'div'}
        ref={ref}
      />
    </Transition>
  )
})

Menu.Button = MenuButton
Menu.Items = MenuItems
Menu.Item = PrimitiveMenu.Item
