const backgroundImage = require('../../../utils/backgroundImage')
const colors = require('../../../utils/colors')

const defaultAttributes = {
  color: colors.ocean[800],
  boxShadow: '0px 8px 10px #0002',
  '.ocean &': {
    boxShadow: '0px 5px 20px #0006',
  },
}

const greenGradient = {
  backgroundImage: backgroundImage['green-gradient'],
  ...defaultAttributes,
}

const redGradient = {
  backgroundImage: backgroundImage['red-gradient'],
  ...defaultAttributes,
}

module.exports = {
  'green-gradient': greenGradient,
  'red-gradient': redGradient,
}
