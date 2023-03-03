const colors = require('../../../colors')

const secondary = {
  backgroundColor: colors.light[300],

  '.ocean &': {
    backgroundColor: colors.ocean[500],
  },
}
const secondaryOutlined = {
  backgroundColor: colors.light[300],
  border: '2px solid',
  borderColor: colors.light[500],
  '.ocean &': {
    backgroundColor: colors.ocean[500],
    borderColor: `${colors.ocean[300]}60`,
  },
}

module.exports = {
  'secondary-outlined': secondaryOutlined,
  secondary,
}
