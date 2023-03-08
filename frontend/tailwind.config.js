/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: `"Aeonik"`,
        mono: `var(--font-aeonik-mono)`,
      },
    },
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../packages/icons/components/**/*.tsx',
    '../packages/interface/components/**/*.tsx',
    '../packages/interface/styles/**/*.ts',
  ],
  plugins: [require('@tradex/theme')],
}
