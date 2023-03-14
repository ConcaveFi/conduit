import { ExchangeCard } from 'src/components/swap/Index'

const exchangePage = () => {
  return (
    <div className=" flex w-full flex-col ">
      <div className="skeleton flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <ExchangeCard />
      </div>
    </div>
  )
}
export default exchangePage
