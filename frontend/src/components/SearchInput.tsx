import { SearchIcon } from '@exchange/icons'
import { Flex, Input } from '@exchange/interface'

export function SearchInput() {
  return (
    <Flex className="w-[240px] bg-ocean-700 rounded-full px-4 h-10 gap-4" centered>
      <SearchIcon className="w-5 h-5 fill-ocean-200" />
      <Input variant="simple.high" className="w-full" placeholder="Search" />
    </Flex>
  )
}
