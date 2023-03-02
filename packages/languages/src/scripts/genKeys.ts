import { readdirSync, writeFile, writeFileSync } from 'fs'
import { join } from 'path'
import { keys } from '..'
import { readJsonFile } from '../utils/readJsonFile'

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
    for (const key of keys) {
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
// This function will create the type LanguageKeys
function genTypes() {
  let [types, index] = ['', 0]
  for (const key of keys) {
    types += `"${key}"`
    if (index < keys.length - 1) types += ' | ' // This will add | to make a multi string type
    index++
  }

  const text = 'export type LanguageKeys = ' + types
  const path = join(__dirname, '..', '..', 'types', 'languageKeys.ts')
  writeFileSync(path, text)
}

// Running ---------------------------------------------------

console.clear()
console.log('-----------------------------\n')
console.log('Analyzing translations files.')

incrementMissing()
genTypes()

console.log('Finished generation off missing attributes.')
console.log(`${totalIcrements} increments in total.`)

console.log('\n-----------------------------')
