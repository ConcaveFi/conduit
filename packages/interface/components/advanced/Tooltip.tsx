import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { DivProps } from '../../types/primitives'
export interface Tooltip extends DivProps {
  info?: string
}
export function Tooltip({ className, info, ...props }: Tooltip) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className={'centered relative z-[100]' + className}
      onMouseEnter={(_) => setHover(true)}
      onMouseLeave={(_) => setHover(false)}
      {...props}
    >
      {props.children}
      <Transition
        key={'tttt'}
        as={Fragment}
        show={hover}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-300 ease-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <div className="tooltip-arrow bg-ocean-300 absolute top-full  mt-[10px] min-h-[20px] rounded-[4px]">
          <span className={'text-medium px-3 py-1 text-center text-sm'}>{info}</span>
        </div>
      </Transition>
    </div>
  )
}
