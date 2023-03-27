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
      className="overflow-hidden"
      bodyProps={{ className: 'justify-around overflow-y-auto group' }}
    >
      {props.children}
      {news?.map((_new, index) => {
        return (
          <NewsButton
            key={index}
            title={_new.title}
            tmp={formatDistanceToNowStrict(new Date(_new.date))}
            owner={_new.owner}
            link={_new.link}
          />
        )
      })}
    </Panel>
  )
})

interface NewsButtonProps {
  owner: string
  tmp: string
  title: string
  link: string
}
function NewsButton(props: NewsButtonProps) {
  return (
    <div className=" flex flex-col gap-2">
      <a
        target="_blank"
        href={props.link}
        className="text-dark-accent ocean:text-blue-accent cursor-pointer hover:underline"
      >
        {props.title}
      </a>
      <span className="text-dark-30 ocean:text-blue-30 text-xs font-medium">
        {props.owner} • {props.tmp} ago
      </span>
    </div>
  )
}
