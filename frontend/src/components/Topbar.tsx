import { AvatarProfile } from './icons/AvatarProfile'
import { ChevronIcon } from './icons/ChevronIcon'

export function Topbar() {
  return (
    <div className="w-full justify-between min-h-[70px] border-b border-dark-700 flex">
      <div className=" items-center flex px-5">
        <span className="text-gray-100 text-2xl font-bold">Exchange</span>
      </div>
      <div className="flex items-center w-[37.6%]  h-full">
        <div className="flex w-[47%] justify-between border-x border-dark-700 h-full px-7">
          <button className="text-gray-400 font-mont font-bold h-full hover:underline flex items-center justify-center text-sm ">
            History
          </button>
          <button className="text-gray-400 font-mont font-bold h-full hover:underline flex items-center justify-center text-sm ">
            Orders
          </button>
          <button className="text-gray-400  font-mont font-bold h-full hover:underline flex items-center justify-center text-sm  ">
            Wallets
          </button>
        </div>
        <div className="flex items-center gap-1 flex-1 justify-center h-full ">
          <span className="text-gray-400 font-nunito font-bold text-md mr-4">Chani's the best</span>
          <AvatarProfile />
          <ChevronIcon />
        </div>
      </div>
    </div>
  )
}
