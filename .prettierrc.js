const tailwind = require('prettier-plugin-tailwindcss')
const organizeImports = require('prettier-plugin-organize-imports')

module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
  plugins: [
    {
      ...tailwind,
      parsers: {
        ...tailwind.parsers,
        ...Object.keys(organizeImports.parsers).reduce((acc, key) => {
          acc[key] = {
            ...tailwind.parsers[key],
            preprocess(code, options) {
              return organizeImports.parsers[key].preprocess(code, options)
            },
          }
          return acc
        }, {}),
      },
    },
  ],
}
