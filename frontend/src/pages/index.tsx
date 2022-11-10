import { PlaceContainer } from '../components/PlaceContainer'
import { Topbar } from '../components/Topbar'
import { TopbarInfo } from '../components/TopbarInfo'

export default function Home() {
  return (
    <div className="h-screen flex flex-col w-full bg-dark">
      <Topbar />
      <div className="flex w-full h-full">
        <div className="w-[85%] flex flex-col">
          <TopbarInfo />
          <div className="flex flex-1">
            <div className="w-[20%] h-full border-r border-dark-700"></div>
            <div className="flex-1  "></div>
            <div className="w-[20%] h-full border-l border-dark-700"></div>
          </div>
        </div>
        <PlaceContainer />
      </div>
    </div>
  )
}
