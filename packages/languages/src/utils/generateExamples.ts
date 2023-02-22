import { readdirSync, writeFile } from 'fs'
import { join } from 'path'
import { example } from '..'
import { readJsonFile } from './readJsonFile'

const DEFAULT_LANG_JSON = 'example.json'
const matchJsonRegex = /\w{0,}\.json/

// PATHS & FILES --------------------------------------------
const translationsDir = join(__dirname, '..', 'translations')
const allFiles = readdirSync(join(translationsDir))
const translationFiles = getTranslationFiles(allFiles)

// METHODS --------------------------------------------------
const tab = '  '
let totalIcrements = 0

async function incrementMissing() {
  for (const file of translationFiles) {
    let increments: string[] = []
    const path = join(translationsDir, file)
    const content = readJsonFile(path)

    // Loop through all keys and add if not exists.
    for (const key in example) {
      if (content[key] !== undefined) continue
      content[key] = ''
      increments.push(key)
    }

    // If has no increments, there's no why wrtie file again.
    if (increments.length == 0) {
      console.log(`${tab}${file} analyzed without increments`)
      continue
    }

    // Write frile & log how many keys has been added.
    const toJson = JSON.stringify(content, null, 2) + '\n'
    writeFile(path, toJson, () => {})

    console.log(`${tab}${file} anylized with ${increments.length} increments:`)
    increments.forEach((a) => console.log(`${tab}${tab} + ${a}.`))
    totalIcrements += increments.length
  }
}

function getTranslationFiles(files: string[]) {
  return files.filter((file) => {
    if (file == DEFAULT_LANG_JSON) return false
    return matchJsonRegex.test(file)
  })
}

// Running ---------------------------------------------------

console.clear()
console.log('-----------------------------\n')
console.log('Analyzing translations files.')

incrementMissing()

console.log('Finished generation off missing attributes.')
console.log(`${totalIcrements} in total.`)

console.log('\n-----------------------------')
