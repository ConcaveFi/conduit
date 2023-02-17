const plugin = require('tailwindcss/plugin')
const slider = require('./plugin/components/slider')
const tooltip = require('./plugin/components/tooltip')

module.exports = plugin(function definePlugin({ addComponents, theme }) {
  addComponents([slider(theme), tooltip(theme)])
}, require('./tailwind.config'))
