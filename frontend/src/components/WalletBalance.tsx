export function WalletBalance() {
  return (
    <div className=" flex flex-col border gap-3 p-2 border-dark-700 bg-dark bg-opacity-60 rounded-md">
      <div className="flex justify-between px-2 text-gray-500 border-b py-2 border-dark-700 font-bold text-xs">
        <span className="font-mont">ASSET</span>
        <span className="font-mont">ASSET</span>
      </div>
      <div className="flex justify-between px-2 text-gray-200 font-bold text-md">
        <span className="font-mont text-sm text-gray-400">USD</span>
        <span className="font-nunito">0.00</span>
      </div>
      <div className="flex justify-between px-2 text-gray-200 font-bold text-md">
        <span className="font-mont text-sm text-gray-400">BTC</span>
        <span className="font-nunito">0.0000</span>
      </div>
    </div>
  )
}
