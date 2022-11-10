import { AvatarProfile } from './icons/AvatarProfile'
import { ChevronIcon } from './icons/ChevronIcon'

export function Topbar() {
  return (
    <div className="w-full justify-between min-h-[70px] border-b border-dark-700 flex">
      <div className=" items-center flex px-5">
        <span className="text-gray-100 text-2xl font-bold">Exchange</span>
      </div>
      <div className="flex items-center gap-1 px-5 h-full">
        <button className="text-gray-400 font-mont font-bold h-full hover:underline flex items-center justify-center text-sm w-32">
          My orders
        </button>
        <button className="text-gray-400  font-mont font-bold h-full hover:underline flex items-center justify-center text-sm w-32 border-x border-dark-700">
          My wallets
        </button>
        <div className="flex items-center gap-1 w-[214px] justify-center">
          <span className="text-gray-400 font-nunito font-bold text-sm">Chani's the best</span>
          <AvatarProfile />
          <ChevronIcon />
        </div>
      </div>
    </div>
  )
}
