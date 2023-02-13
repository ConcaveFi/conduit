import { Transition } from '@headlessui/react'
import { useRef, useState, useMemo, Fragment, useEffect } from 'react'
import { PrimitiveInputProps } from '../../types/primitives'
import { Flex } from './Flex'
import { Text } from './Text'

interface RawSliderProps extends PrimitiveInputProps {
  defaultValue?: number
  max?: number
  min?: number
}

function RawSlider(props: RawSliderProps) {
  const { max, min, defaultValue, className, ...rest } = props
  const [value, setValue] = useState<number>(defaultValue)
  const [pressed, setPressed] = useState(false)
  const ref = useRef<HTMLDivElement>()
  const [width, setWidth] = useState(0)
  const size = 14

  useEffect(() => setValue(+props.value), [props.value])
  useEffect(() => setWidth(ref.current?.clientWidth || 0), [ref])
  useEffect(() => {
    if (!ref.current) return
    new ResizeObserver((e) => setWidth(e[0].target.clientWidth)).observe(ref.current)
  }, [])

  const left = useMemo(() => {
    let middle = value * (width / max)
    const difference = (middle / width) * 2 - 1
    return middle - difference * (size / 2) || 0
  }, [width, value, min, max])

  return (
    <span ref={ref} className="flex items-center relative w-full h-6 cursor-pointer">
      <div
        className="bg-gradient-to-r max-w-[100%] from-[#34EDB380] to-[#00D1FF80] flex justify-end items-center z-20 pointer-events-none h-[5px] rounded-full absolute"
        style={{ width: left }}
      />
      <Transition
        show={pressed}
        as={Fragment}
        enter="transition-[transform] duration-[0.2s] ease-out"
        enterFrom="scale-75 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition-all duration-200 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-75 opacity-0"
      >
        <Flex
          justify="center"
          className="bg-gradient-to-r from-[#34EDB340] to-[#00D1FF40] absolute pointer-events-none z-10 rounded-full "
          style={{ width: 30, height: 30, left: left - 15 }}
        >
          <Flex
            centered
            className="min-w-[40px] h-10 rounded-lg -mt-12 bg-ocean-600 border-ocean-400 border-2 shadow-xl"
          >
            <Text>{value}</Text>
          </Flex>
        </Flex>
      </Transition>
      <input
        max={max}
        type="range"
        onMouseDown={() => setPressed(true)}
        onInput={(e) => setValue(+e.currentTarget.value)}
        className={`green-slider ${className}`}
        onMouseUp={() => setPressed(false)}
        value={value || 0}
        min={min}
        {...rest}
      />
    </span>
  )
}
export interface SliderProps extends RawSliderProps {
  track?: boolean
}
export function Slider({ track = false, ...props }: SliderProps) {
  const { max = 100, min = 0 } = props
  const trackAmount = 5
  const steps = max / (trackAmount - 1)

  if (track)
    return (
      <Flex column className=" gap-1">
        <RawSlider max={max} min={min} {...props} />
        <Flex
          style={{ width: `` }}
          justify="between"
          className="w-full pointer-events-none mx-auto relative px-[6px]"
        >
          {new Array(5).fill(0).map((_, i) => (
            <Flex key={i}>
              <Flex className="bg-ocean-300 w-[2px] h-[8px] justify-center" style={{}}>
                <Text className="absolute mt-2">{i * steps}</Text>
              </Flex>
              {/* {i <= 3 && (
                <Flex
                  style={{
                    backgroundPosition: '12px 0px',
                    backgroundImage: 'url(assets/track.svg)',
                    backgroundSize: '100% 8px',
                  }}
                  className="w-[85px] "
                ></Flex>
              )} */}
            </Flex>
          ))}
        </Flex>
      </Flex>
    )
  return <RawSlider {...props} />
}
