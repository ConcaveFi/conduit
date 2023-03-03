const mixedColors = require('./mixedColors')

/*
This function will map tailwind colors to be used as values in 
matchComponents or matchUtilities.
Motivation: When you use theme('colors') it wont work properly
so this function is necessary to map: 
 const slate = { 
  100: "#888",
  200: "#999",
  300: "#aaa",
  400: "#bbb",
  500: "ccc",
}
in:
const colors = {
  'slate-100': "#888",
  'slate-200': "#999",
  'slate-300': "#aaa",
  'slate-400': "#bbb",
  'slate-500': "ccc",
  ...
}
*/

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
