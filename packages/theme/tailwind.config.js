const colors = require('./utils/colors')
const backgroundImage = require('./utils/backgroundImage')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors,
      backgroundImage,
    },
  },
}
