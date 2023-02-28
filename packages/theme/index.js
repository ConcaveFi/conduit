const plugin = require('tailwindcss/plugin')
const slider = require('./components/slider')
const tooltip = require('./components/tooltip')
const variants = require('./utils/variants')
const btn = require('./components/buttons')
const card = require('./components/card')

module.exports = plugin(function definePlugin({ theme, ...twd }) {
  twd.addComponents([slider(theme), tooltip(theme), ...btn.components, ...card.components])
  twd.matchComponents({ card: (v) => ({ ...v }) }, { values: card.variants })
  twd.matchComponents({ btn: (v) => ({ ...v }) }, { values: btn.variants })
  for (let { name, definition } of variants) twd.addVariant(name, definition)
}, require('./tailwind.config'))
