import { NextApiRequest, NextApiResponse } from 'next'

const FEED_ENDPOINT = 'https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=json'

const oneDaySeconds = 60 * 60 * 60 * 24

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = (await (await fetch(FEED_ENDPOINT)).json()) as RawCoindeskFeed
    const items = response.rss.channel.item
    const mappedItems = items.map(mapRawNewsItem).slice(0, 3)
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${oneDaySeconds}, stale-while-revalidate=${oneDaySeconds}`,
    )
    res.status(200).json(mappedItems)
  } catch (err) {
    return []
  }
}

function mapRawNewsItem(item: RawCoindeskItem): NewsItem {
  const description = item.description.$
  const date = item.pubDate
  const link = item.link
  const title = item.title.$
  const owner = item['dc:creator'].$
  return { title, link, description, date, owner }
}
