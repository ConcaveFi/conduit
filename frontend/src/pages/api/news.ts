import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = (await fetch(
    'https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=json',
  ).then((data) => data.json())) as {
    rss: {
      channel: {
        item: {
          title: { $: string }
          link: string
          'dc:creater': { $: string }
        }[]
      }
    }
  }

  res.status(200).json(response.rss.channel.item)
}
