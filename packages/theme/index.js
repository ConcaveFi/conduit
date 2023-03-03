const plugin = require('tailwindcss/plugin')
const slider = require('./src/components/slider')
const tooltip = require('./src/components/tooltip')
const variants = require('./src/variants')
const btn = require('./src/components/buttons')
const card = require('./src/components/card')
const box = require('./src/utilities/box')
const skeletons = require('./src/utilities/skeleton')

module.exports = plugin(function definePlugin({ theme, ...twd }) {
  twd.addComponents([slider(theme), tooltip(theme), ...btn.components, ...card.components])
  twd.matchComponents({ card: (v) => ({ ...v }) }, { values: card.variants })
  twd.matchComponents({ btn: (v) => ({ ...v }) }, { values: btn.variants })
  twd.matchUtilities(box.utility, box.options(theme))
  for (let { options, utility } of skeletons) twd.matchUtilities(utility, options)

  for (let { name, definition } of variants) twd.addVariant(name, definition)
}, require('./tailwind.config'))
