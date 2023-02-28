import { Menu as PrimitiveMenu, Transition } from '@headlessui/react'
import { VariantProps } from 'class-variance-authority'
import React, { forwardRef, Fragment } from 'react'
import { menuBodyStyles } from '../../styles/advanced/menuStyles'
import { ButtonProps, DivProps } from '../../types/primitives'
import { Card, CardProps } from './Card'

export function Menu({ ...props }: DivProps) {
  props.className = `relative z-10 ${props.className}`
  return React.createElement(PrimitiveMenu, { as: 'div', ...props })
}

const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <PrimitiveMenu.Button as={'button'} {...props} />
})

const MenuItems = forwardRef<HTMLDivElement, CardProps & VariantProps<typeof menuBodyStyles>>(
  ({ className, origin, ...props }, ref) => {
    const styles = menuBodyStyles({ className, origin })
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
        <PrimitiveMenu.Items className={styles} as={Card} ref={ref} {...props} />
      </Transition>
    )
  },
)

Menu.Button = MenuButton
Menu.Items = MenuItems
Menu.Item = PrimitiveMenu.Item
