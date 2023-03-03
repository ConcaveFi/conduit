const mixedColors = require('./mixedColors')

function colorValues() {
  const _colors = {}
  for (let [color, cValue] of Object.entries(mixedColors)) {
    if (typeof cValue !== 'object') {
      Object.assign(_colors, { [color]: cValue })
      continue
    }

    for (let [key, value] of Object.entries(cValue)) {
      const colorWithValue = `${color}-${key}`
      Object.assign(_colors, { [colorWithValue]: value })
    }
  }
  return _colors
}

module.exports = colorValues
