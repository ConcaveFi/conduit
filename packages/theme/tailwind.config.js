const colors = require('./utils/colors')
const backgroundImage = require('./utils/backgroundImage')
const keyframes = require('./utils/keyframes')
const animation = require('./utils/animation')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      keyframes,
      backgroundImage,
      animation,
      colors,
    },
  },
}
