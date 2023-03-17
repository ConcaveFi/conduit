const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'Blue/Main-bg': '#0E052D',
        'Blue/main-block': '#1A224C',
        'blue-blue': '#6FA0E4',
        'Blue/main-dim': '#3E5389',
        'Blue/Bright-text': '#CCE1FF',
        'Blue/chart-ng': '#0C0D36',
        'Blue/main-dim': '#3E5389',
        'Blue/Green-Cyan': '#34EDB3',
        'Blue/block-bg50': '#0B1640',
      },
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
