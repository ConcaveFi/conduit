const backgroundImage = require('../../../backgroundImage')
const colors = require('../../../colors')

const defaultAttributes = {
  boxShadow: '0px 8px 10px #0002',
  color: 'white',
  '.ocean &': {
    boxShadow: '0px 5px 20px #0006',
  },
}

const greenGradient = {
  backgroundImage: backgroundImage['dark-green-gradient'],
  color: 'white',
  '.ocean &': {
    backgroundImage: backgroundImage['blue-green-gradient'],
  },
  // ...defaultAttributes,
}

const redGradient = {
  backgroundImage: backgroundImage['dark-red-gradient'],
  color: 'white',
  '.ocean &': {
    backgroundImage: backgroundImage['blue-red-gradient'],
  },
  // ...defaultAttributes,
}

module.exports = {
  'green-gradient': greenGradient,
  'red-gradient': redGradient,
}
