interface RawCoindeskFeed {
  rss: {
    '@version': string
    '@xmlns:content': string
    '@xmlns:wfw': string
    '@xmlns:dc': string
    '@xmlns:atom': string
    '@xmlns:sy': string
    '@xmlns:slash': string
    '@xmlns:media': string
    channel: {
      title: string
      link: string[]
      'atom:link': { '@href': string; '@rel': string; '@type': string | undefined }
      description: string
      lastBuildDate: string
      language: string
      category: {
        '#': string
        '@domain': string
      }
      item: RawCoindeskItem[]
    }
  }
}
type RawCoindeskItem = {
  title: {
    $: string
  }
  link: string
  guid: {
    '#': string
    '@isPermaLink': boolean
  }
  'dc:creator': {
    $: string
  }
  description: {
    $: string
  }
  pubDate: string
  'atom:updated': string
}

type NewsItem = {
  description: string
  owner: string
  title: string
  link: string
  date: string
}
