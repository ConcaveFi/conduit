const colors = require('../../../colors')

const primary = {
  backgroundColor: colors.light[100],
  '.ocean &': {
    backgroundColor: colors.ocean[800],
  },
}

const primaryOutlined = {
  backgroundColor: colors.light[100],
  border: '2px solid',
  borderColor: colors.light[300],
  '.ocean &': {
    backgroundColor: colors.ocean[800],
    borderColor: colors.ocean[400],
  },
}

module.exports = {
  'primary-outlined': primaryOutlined,
  primary,
}
