/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../packages/icons/components/**/*.tsx',
    '../packages/interface/components/**/*.tsx',
  ],
  plugins: [require('@exchange/theme')],
}
