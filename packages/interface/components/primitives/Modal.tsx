import { Dialog, Transition } from '@headlessui/react'
import { cva, VariantProps } from 'class-variance-authority'
import { Fragment } from 'react'
import { ContainerProps, containerStyles } from './Container'
import { FlexProps, flexStyles } from './Flex'

export const modalStyles = cva(cva('')(), {
  variants: {
    variant: {
      primary: 'bg-ocean-800 rounded-2xl border border-ocean-300 border-opacity-40  shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
export type ModalStyles = VariantProps<typeof modalStyles>
export interface ModalProps extends ContainerProps, FlexProps, ModalStyles {
  isOpen: boolean
  onClose: VoidFunction
  overlay?: boolean
}
export function Modal(props: ModalProps) {
  const { isOpen, onClose, className, space, expand, overlay = true, ...rest } = props
  const { justify, align, grow, column, centered, row, variant, ...panelProps } = rest

  const _flexStyles = flexStyles({ align, centered, column, justify, grow, row })
  const _containerStyles = containerStyles({ space, expand })
  const _modalStyles = modalStyles({ className, variant })
  return (
    <Transition appear unmount show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={onClose}>
        {overlay && <Overlay />}
        {/* Container */}
        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${_containerStyles} ${_flexStyles} ${_modalStyles}`}
                {...panelProps}
              />
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
const Overlay = () => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
  </Transition.Child>
)
