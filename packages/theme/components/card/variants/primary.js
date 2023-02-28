const colors = require('../../../utils/colors')

const primary = {
  backgroundColor: colors.ocean[800],
}

const primaryOutlined = {
  ...primary,
  border: '2px solid',
  borderColor: colors.ocean[400],
}

module.exports = {
  'primary-outlined': primaryOutlined,
  primary,
}
