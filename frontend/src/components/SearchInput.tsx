import { SearchIcon } from '@tradex/icons'
import { Input } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'

export function SearchInput() {
  const { t } = useTranslation()
  return (
    <div className="bg-ocean-700 centered flex h-10 w-[240px] gap-4 rounded-full px-4">
      <SearchIcon className="fill-ocean-200 h-5 w-5" />
      <Input variant="simple.high" className="w-full" placeholder={t('search')} />
    </div>
  )
}
