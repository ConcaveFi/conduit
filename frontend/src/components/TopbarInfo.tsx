export function TopbarInfo() {
  return (
    <div className="w-full min-h-[50px] bg-dark-900 border-b border-dark-700 flex">
      <div className="w-[20%] h-full border-r border-dark-700 flex items-end p-2">
        <span className="text-gray-300  uppercase text-xs font-semibold">Trade History</span>
      </div>
      <div className="flex-1 flex items-end p-2">
        <span className="text-gray-300  uppercase text-xs font-semibold ">Price Chart</span>
      </div>
      <div className="w-[20%] h-full border-l border-dark-700 flex items-end p-2">
        <span className="text-gray-300  uppercase text-xs font-semibold">Order book</span>
      </div>
    </div>
  )
}
