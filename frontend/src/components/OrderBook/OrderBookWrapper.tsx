export function OrderBookWrapper() {
  return (
    <div className="w-[22%] h-full border-l border-dark-700 flex flex-col overflow-hidden">
      <HeaderInfo values={['Market size', 'Price(USD)', 'My size']} />
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <div className=" w-full h-full  overflow-y-auto scrollbar-hidden">
          {new Array(20)
            .fill(0)
            .map(() => Math.random() * 10 + 1400)
            .sort((price, prev) => prev - price)
            .map((price) => (
              <OrderRow price={price.toFixed(2)} />
            ))}
        </div>
      </div>
      <HeaderInfo values={['Market size', 'Price(USD)', 'My size']} className="border-t" />
      <div className="w-full flex flex-col flex-1 ">
        <div className="w-full h-full overflow-y-auto"></div>
      </div>
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

interface OrderRowProps {
  price: string
}
function OrderRow({ price }: OrderRowProps) {
  const isBuy = Math.random() > 0.4

  return (
    <div className="flex py-1">
      <span className="font-nunito text-sm flex flex-1 justify-center items-center text-gray-400 font-bold ">
        {(Math.random() * 2).toFixed(4)}
      </span>
      <span
        className={`font-nunito text-sm flex flex-1 justify-center items-center ${
          isBuy ? 'text-green-400' : 'text-red-400'
        } font-bold `}
      >
        {price}
      </span>
      <span className="font-nunito text-sm flex flex-1 justify-center items-center text-gray-300 font-bold ">
        -
      </span>
    </div>
  )
}
