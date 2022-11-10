export function OrderBookWrapper() {
  return (
    <div className="w-[22%] h-full border-l border-dark-700 flex flex-col">
      <HeaderInfo values={['Market size', 'Price(USD)', 'My size']} />
      <div className="w-full flex flex-col flex-1"> </div>
      <HeaderInfo values={['Market size', 'Price(USD)', 'My size']} className="border-t" />
      <div className="w-full flex flex-col flex-1"> </div>
    </div>
  )
}
interface HeaderInfoProps {
  values: string[]
  className?: string
}
function HeaderInfo({ values, className = '' }: HeaderInfoProps) {
  return (
    <div className={`flex h-10 border-b border-dark-700 ${className}`}>
      {values.map((value, i) => (
        <span
          key={value + i}
          className="text-gray-300 font-medium text-xs flex-1 flex justify-center items-center"
        >
          {value}
        </span>
      ))}
    </div>
  )
}
