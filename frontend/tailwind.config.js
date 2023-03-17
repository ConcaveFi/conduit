const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: `var(--font-sans)`,
        mono: `var(--font-mono)`,
      },
      fontSize: {
        '2xs': '0.625rem', // 10 px
        '3xs': '0.5rem', // 8 px
      },
    },
  },
  content: [
    './**/*.tsx',
    '../packages/icons/components/**/*.tsx',
    '../packages/interface/components/**/*.tsx',
    '../packages/interface/styles/**/*.ts',
  ],
  plugins: [
    require('@tradex/theme'),
    plugin(({ addVariant }) => {
      addVariant('aria-enabled', '&[aria-disabled="false"]')
    }),
  ],
}
