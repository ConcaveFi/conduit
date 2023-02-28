const colors = require('../../../utils/colors')
const tcssColors = require('tailwindcss/colors')

const down = {
  backgroundColor: colors.ocean[600],
  color: tcssColors.gray[300],
}

const bottomGlow = {
  backgroundImage: `linear-gradient(to bottom, #0000, #00D1FF50)`,
  borderBottom: '2px solid',
  borderColor: colors.ocean[100],
  color: colors.ocean[100],
}

module.exports = {
  down,
  'bottom-glow': bottomGlow,
}
