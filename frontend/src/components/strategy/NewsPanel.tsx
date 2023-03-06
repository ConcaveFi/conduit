import { Panel, PanelProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { forwardRef, useEffect, useState } from 'react'

export const NewsPanel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { t } = useTranslation()
  const [news, setNews] = useState<{ title: string; link: string; by: string }[]>([])
  useEffect(() => {
    fetchNews()
  }, [])

  function fetchNews() {
    const res = fetch('/api/news')
      .then((data) => data.json() as any)
      .then((data) => {
        let sliced = data.slice(0, 3)
        sliced = sliced.map((d) => {
          const title = d.title.$
          const link = d.link
          const by = d['dc:creator'].$
          return { title, link, by }
        })
        setNews(sliced)
      })
  }
  console.log(news)

  return (
    <Panel
      ref={ref}
      {...props}
      name={t('news')}
      variant="secondary"
      className="h-[300px] w-full"
      bodyProps={{ className: 'justify-around' }}
    >
      {news?.map((_new) => (
        <div className="flex flex-col gap-2 ">
          <span className="text-light-500 ocean:text-ocean-100">{_new.title}</span>
          <span className="text-light-400 ocean:text-ocean-300 text-xs font-medium">
            {_new.by} • 6 minutes ago
          </span>
        </div>
      ))}
    </Panel>
  )
})
