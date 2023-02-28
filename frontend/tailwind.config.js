const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const customColors = require('@tradex/theme/utils/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../packages/icons/components/**/*.tsx',
    '../packages/interface/components/**/*.tsx',
    '../packages/interface/styles/**/*.ts',
  ],
  theme: {
    extend: {
      keyframes: {
        'color-transition': {
          '0%': { backgroundColor: 'var(--skeleton-from)' },
          '50%': { backgroundColor: 'var(--skeleton-to)' },
          '100%': { backgroundColor: 'var(--skeleton-from)' },
        },
      },
      animation: {
        skeleton: 'color-transition 2000ms  infinite',
      },
    },
  },
  plugins: [
    require('@tradex/theme'),
    plugin(function define(pl) {
      pl.matchComponents(
        { 'skeleton-from': (v) => ({ '--skeleton-from': v }) },
        { values: mapColors() },
      )
      pl.matchComponents(
        { 'skeleton-to': (v) => ({ '--skeleton-to': v }) },
        { values: mapColors() },
      )
    }),
  ],
}

function mapColors() {
  const _colors = {}
  for (let [color, colorObj] of Object.entries(colors)) {
    console.log(color, '-', colorObj)
    for (let [key, value] of Object.entries(colorObj)) {
      _colors[`${color}-${key}`] = value
    }
  }
  for (let [color, colorObj] of Object.entries(customColors)) {
    console.log(color, '-', colorObj)
    for (let [key, value] of Object.entries(colorObj)) {
      _colors[`${color}-${key}`] = value
    }
  }
  return _colors
}
