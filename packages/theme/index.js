const plugin = require('tailwindcss/plugin')
const slider = require('./components/slider')
const tooltip = require('./components/tooltip')
const variants = require('./utils/variants')
const btn = require('./components/buttons')

module.exports = plugin(function definePlugin({
  addComponents,
  theme,
  addVariant,
  matchComponents,
}) {
  addComponents([slider(theme), tooltip(theme), ...btn.components])
  // matchComponents({ btn: (v) => ({ ...v }) }, { values: btn.variants })

  for (let { name, definition } of variants) addVariant(name, definition)
},
require('./tailwind.config'))
