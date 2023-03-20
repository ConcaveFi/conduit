const colors = require('../../../colors')
const tcssColors = require('tailwindcss/colors')

const bottomGlow = {
  borderBottom: '2px solid',
  backgroundImage: `linear-gradient(to bottom, #0000, #0001)`,
  borderColor: colors.dark.accent,
  color: colors.dark.accent,
  backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 23.23%, rgba(255, 255, 255, 0.15) 100%)`,
  '.ocean &': {
    backgroundImage: `linear-gradient(180deg, rgba(0, 209, 255, 0) 23.23%, rgba(0, 209, 255, 0.15) 100%)`,
    color: colors.blue.accent,
    borderColor: colors.accent,
  },
}

module.exports = {
  'bottom-glow': bottomGlow,
}
