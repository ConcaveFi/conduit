import { Dialog, Transition } from '@headlessui/react'
import { CloseIcon } from '@tradex/icons'
import { Fragment } from 'react'
import { twJoin } from 'tailwind-merge'
import { DivProps } from '../../types/primitives'
export interface ModalProps extends DivProps {
  isOpen: boolean
  onClose: VoidFunction
  overlay?: boolean
}
export function Modal(props: ModalProps) {
  const { isOpen, onClose, overlay = true, className, ...panelProps } = props
  return (
    <Transition appear unmount show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={onClose}>
        {overlay && <Overlay />}
        {/* Container */}
        <div className="centered fixed inset-0 flex overflow-y-auto ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* @ts-ignore */}
            <Dialog.Panel
              as={'div'}
              className={twJoin('m-2 mt-auto sm:mt-2', className)}
              {...panelProps}
            />
          </Transition.Child>
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
    <div className="ocean:bg-opacity-50 fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
  </Transition.Child>
)

export const ModalHeader = ({ message, onClose }: { message: string; onClose?: () => void }) => {
  return (
    <div className="flex justify-between">
      <p className="text-dark-accent ocean:text-blue-accent text-lg">{message}</p>
      <div className="flex cursor-pointer items-center">
        <CloseIcon
          onClick={onClose}
          className="stroke-dark-accent ocean:text-blue-accent h-3 w-3 "
        />
      </div>
    </div>
  )
}
