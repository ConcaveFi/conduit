const { fontWeight } = require('tailwindcss/defaultTheme')
const { ocean } = require('../../utils/colors')

const variants = {
  heading: {
    fontWeight: fontWeight.bold,
    color: 'white',
  },
  high: { color: ocean[100] },
  medium: { color: ocean[200] },
  low: { color: ocean[300], fontWeight: fontWeight.medium },
}

module.exports = {
  variants,
}
