import { useQuery } from '@tanstack/react-query'
import { Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { formatDistanceToNowStrict } from 'date-fns'
import { forwardRef } from 'react'

export function useNews() {
  const query = useQuery(['news'], async function fetchNews() {
    const response = await (await fetch('/api/news')).json()
    return response as NewsItem[]
  })
  return query
}

export const NewsPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  const { data: news } = useNews()

  return (
    <Panel
      ref={ref}
      {...props}
      name={t('news')}
      variant="secondary"
      className="h-[300px] w-full"
      bodyProps={{ className: 'justify-around' }}
    >
      {news?.map((_new) => {
        const date = new Date(_new.date)
        const distance = formatDistanceToNowStrict(date)

        return (
          <div className="flex flex-col gap-2 ">
            <span className="text-light-500 ocean:text-ocean-100">{_new.title}</span>
            <span className="text-light-400 ocean:text-ocean-300 text-xs font-medium">
              {_new.owner} • {distance} ago
            </span>
          </div>
        )
      })}
    </Panel>
  )
})
