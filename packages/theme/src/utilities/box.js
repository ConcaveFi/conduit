const { width } = require('tailwindcss/defaultTheme')

function box(value) {
  return {
    width: value,
    height: value,
  }
}

const options = (theme) => ({
  values: theme('width'),
})

module.exports = { utility: { box }, options }
