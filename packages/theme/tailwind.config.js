const colors = require('./src/colors')
const backgroundImage = require('./src/backgroundImage')
const keyframes = require('./src/keyframes')
const animation = require('./src/animation')

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
