import { readFileSync } from 'fs'

export function readJsonFile<P extends [] | {}>(path: string) {
  const rawFile = readFileSync(path)
  const stringified = rawFile.toString()
  if (!stringified) return {}
  return JSON.parse(stringified || '{}') as P
}
