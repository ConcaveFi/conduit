const colors = require('../../../colors')

const translucentGlass = {
  backdropFilter: 'blur(4px)',
  boxShadow: '0px 18px 29px rgba(8, 8, 30, 0.43)',
  border: '2px solid',
  backgroundColor: `${colors.dark[20]}cc`,
  borderColor: colors.dark[20],
  '.ocean &': {
    backgroundColor: `${colors.blue[20]}cc`,
    borderColor: colors.blue[30],
  },
}

module.exports = {
  'translucent-glass': translucentGlass,
}
