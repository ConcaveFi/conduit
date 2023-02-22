import { SearchIcon } from '@tradex/icons'
import { Flex, Input } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'

export function SearchInput() {
  const { t } = useTranslation()
  return (
    <Flex className="w-[240px] bg-ocean-700 rounded-full px-4 h-10 gap-4" centered>
      <SearchIcon className="w-5 h-5 fill-ocean-200" />
      <Input variant="simple.high" className="w-full" placeholder={t('search')} />
    </Flex>
  )
}
