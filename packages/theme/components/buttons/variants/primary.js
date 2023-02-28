const colors = require('../../../utils/colors')

const primary = {
  backgroundColor: colors.ocean[700],
  color: colors.ocean[200],
  '&:hover': {
    backgroundColor: colors.ocean[500],
  },
}
const primaryOutlined = {
  border: '2px solid',
  borderColor: colors.ocean[500],
  color: colors.ocean[200],
  '&:disabled': {
    color: colors.ocean[300],
  },
}

module.exports = {
  primary,
  'primary.outlined': primaryOutlined,
}
