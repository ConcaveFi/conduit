import {
  ChevronIcon,
  BalanceIcon,
  CloseIcon,
  CoinIcon,
  ExpandIcon,
  FundingIcon,
  NotificationIcon,
  PercentIcon,
  SailIcon,
  SearchIcon,
  Arrow,
  DashboardIcon,
  LineGrowIcon,
  PlusIcon,
} from '@exchange/icons'
import { useIsMounted } from 'src/hooks/useIsMounted'
export default function Home() {
  const isMounted = useIsMounted()
  if (!isMounted) return <></>

  return (
    <div className="h-screen flex flex-col w-full bg-ocean-900">
      <BalanceIcon />
      <PercentIcon />
      <CoinIcon />
      <FundingIcon />
      <SailIcon />
      <SearchIcon />
      <ChevronIcon />
      <NotificationIcon />
      <CloseIcon />
      <ExpandIcon />
      <Arrow />
      <DashboardIcon />
      <LineGrowIcon />
      <PlusIcon />
      <span className="text-white"></span>
    </div>
  )
}
