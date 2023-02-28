const colors = require('../../../utils/colors')

const secondary = {
  backgroundColor: colors.ocean[500],
  color: colors.ocean[200],
  '&:hover': {
    backgroundColor: colors.ocean[400],
  },
}
const secondaryOutlined = {
  border: '2px solid',
  borderColor: colors.ocean[300],
  color: colors.ocean[200],
  '&:hover': {
    backgroundColor: colors.ocean[600],
  },
}

module.exports = {
  secondary,
  'secondary.outlined': secondaryOutlined,
}
