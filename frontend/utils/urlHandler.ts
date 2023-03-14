// function queryUrl<P extends string>(url: string, ...values: P[]): any

export function queryUrl<P extends string>(url: string, ...values: P[]) {
  const queries = {} as { [key in P]: string }
  for (let toFind of values) queries[toFind] = findValueOnUrl(url, toFind)
  return queries
}

export function findValueOnUrl(url: string, toFind: string) {
  if (!toFind) return ''
  if (!url.includes(toFind)) return ''

  // + on url means a empty space, this is why we do the replace here
  // TODO: Make a full responsive handler for especial characters
  url = url.replaceAll('+', ' ')

  const indexOfSequence = url.indexOf(toFind)
  const start = indexOfSequence + toFind.length
  url = url.substring(start)

  if (url[0] !== '=') return ''
  url = url.substring(1)

  let finalIndex = url.indexOf('&')
  if (finalIndex === -1) return url
  else return url.substring(0, finalIndex)
}
