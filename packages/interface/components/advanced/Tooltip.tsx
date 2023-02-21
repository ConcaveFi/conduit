import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Flex, FlexProps, Text, TextProps } from '../primitives'

export interface Tooltip extends FlexProps {
  info?: string
  infoProps?: TextProps
}
export function Tooltip({ className, info, infoProps, ...props }: Tooltip) {
  const [hover, setHover] = useState(false)
  return (
    <Flex
      className={'relative z-[100]' + className}
      onMouseEnter={(_) => setHover(true)}
      onMouseLeave={(_) => setHover(false)}
      centered
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
        <Flex className="tooltip-arrow absolute bg-ocean-300 rounded-[4px]  min-h-[20px] top-full mt-[10px]">
          <Text
            {...infoProps}
            align={'center'}
            className={'px-3 py-1 ' + infoProps?.className}
            variant={'medium'}
            size={'sm'}
          >
            {info}
          </Text>
        </Flex>
      </Transition>
    </Flex>
  )
}
