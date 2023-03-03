const colors = require('tailwindcss/colors')
const customColors = require('../colors')

const mixedColors = { ...colors, ...customColors }

module.exports = mixedColors
