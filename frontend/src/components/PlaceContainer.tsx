export function PlaceContainer() {
  return (
    <div className="w-[20%] bg-dark-900 border-l border-dark-700 flex flex-col">
      <TopbarInfo />

      <div className="flex flex-1 flex-col p-6 gap-6">
        <div className="flex h-12  border-dark-700 bg-dark-700 rounded-md">
          <button className="flex flex-1 items-center justify-center text-green-100 font-nunito font-bold bg-green-gradient rounded-md">
            Buy
          </button>
          <button className="flex flex-1 items-center justify-center text-gray-200 font-nunito font-bold ">
            Sell
          </button>
        </div>

        <PlaceInput>Amount</PlaceInput>
        <PlaceInput>Limit</PlaceInput>
        <button className="w-full h-14 bg-green-gradient rounded-md font-nunito mt-4 text-green-50 font-bold">
          Place buy order
        </button>
        <div className="w-full h-[2px] bg-dark-700"></div>
      </div>
    </div>
  )
}

function PlaceInput(props: any) {
  return (
    <div className="flex flex-col gap-1 ">
      <span className="text-gray-400 font-bold font-urbanist text-[12px] uppercase">
        {props.children}
      </span>
      <div className="flex justify-between gap-4 items-center rounded-md  text-gray-200 font-urbanist font-semibold  h-[58px] bg-dark-700">
        {props.children == 'Amount' && (
          <button className="ml-3 text-gray-500 uppercase font-nunito text-xs underline">
            max
          </button>
        )}
        <input
          className="outline-none bg-transparent text-end flex-1 "
          type="text"
          placeholder="0.00"
        />
        <div className="w-10 h-full border-l border-dark-900"> </div>
      </div>
    </div>
  )
}

function TopbarInfo() {
  return (
    <div className="w-full min-h-[50px] border-b border-dark-700 flex items-end p-2">
      <span className="text-gray-300  uppercase text-xs font-semibold">Order</span>
    </div>
  )
}
