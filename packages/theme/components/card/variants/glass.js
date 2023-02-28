const colors = require('../../../utils/colors')

const translucentGlass = {
  backdropFilter: 'blur(4px)',
  boxShadow: '0px 18px 29px rgba(8, 8, 30, 0.43)',
  border: '2px solid',
  backgroundColor: `${colors.light[200]}cc`,
  borderColor: colors.light[300],
  '.ocean &': {
    backgroundColor: '#1A224CCC',
    borderColor: '#202959',
  },
}

module.exports = {
  'translucent-glass': translucentGlass,
}
