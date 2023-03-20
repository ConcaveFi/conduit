const colors = require('../colors')

function greenSlider(theme) {
  return {
    appearance: 'none',
    width: '100%',
    height: '20px',
    '-webkit-appearance': 'none',
    'background-color': 'transparent',
    ' -moz-appearance': 'none',
    position: 'relative',
    '&::-webkit-slider-runnable-track': {
      'border-radius': '20px',
      height: '5px',
      background: colors.dark[30],
    },
    '.ocean &::-webkit-slider-runnable-track': {
      background: colors.blue[30],
    },
    '&::-webkit-slider-thumb': {
      height: '14px',
      width: '14px',
      'pointer-events': 'auto',
      '-webkit-appearance': 'none',
      background: 'linear-gradient(90deg, #34edb3 0%, #00d1ff 100%)',
      'box-shadow': '0px 0px 20px #0009',
      'border-radius': '25px',
      'margin-top': '-4px',
      cursor: 'pointer',
      'z-index': '20',
    },
  }
}
module.exports = (theme) => ({
  '.green-slider': greenSlider(theme),
})
