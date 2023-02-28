import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Card, CardProps } from '../advanced'
export interface ModalProps extends CardProps {
  isOpen: boolean
  onClose: VoidFunction
  overlay?: boolean
}
export function Modal(props: ModalProps) {
  const { isOpen, onClose, overlay = true, ...panelProps } = props
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
            <Dialog.Panel as={Card} {...panelProps} />
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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
  </Transition.Child>
)
