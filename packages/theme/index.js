const plugin = require('tailwindcss/plugin')
const slider = require('./plugin/components/slider')
const tooltip = require('./plugin/components/tooltip')
const variants = require('./utils/variants')

module.exports = plugin(function definePlugin({ addComponents, theme, addVariant }) {
  addComponents([slider(theme), tooltip(theme)])
  for (let { name, definition } of variants) addVariant(name, definition)
}, require('./tailwind.config'))
