const plugin = require('tailwindcss/plugin')
const slider = require('./plugin/components/slider')

module.exports = plugin(function definePlugin({ addComponents, theme }) {
  addComponents(slider(theme))
}, require('./tailwind.config'))
