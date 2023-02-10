import { Transition } from '@headlessui/react'
import { useRef, useState, useMemo, Fragment } from 'react'

export function Slider() {
  const [value, setValue] = useState(0)
  const [pressed, setPressed] = useState(false)
  const ref = useRef<HTMLDivElement>()
  const width = useMemo(() => ref.current?.clientWidth, [ref])
  const size = 22

  const left = useMemo(() => {
    let middle = value * (width / 100)
    const difference = (middle / width) * 2 - 1
    return middle - difference * (size / 2)
  }, [width, value])

  return (
    <div ref={ref} className="flex items-center relative">
      <div
        className="bg-green-gradient flex justify-end items-center z-0 h-[6px] rounded-full absolute"
        style={{ width: left }}
      />
      <Transition
        show={pressed}
        // unmount
        as={Fragment}
        enter="transition-[transform] duration-[0.2s] ease-out"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-100 opacity-100"
      >
        <div
          className="bg-gradient-to-r  from-[#34EDB320] to-[#00D1FF20] absolute  z-0 rounded-full "
          style={{ width: 40, height: 40, left: left - 20 }}
        />
      </Transition>
      <input
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        type="range"
        onInput={(e) => setValue(+e.currentTarget.value)}
      />
    </div>
  )
}
