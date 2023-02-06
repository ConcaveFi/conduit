/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../packages/icons/components/**/*.tsx'],
  plugins: [require('@exchange/theme')],
}
