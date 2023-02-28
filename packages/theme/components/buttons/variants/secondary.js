const colors = require('../../../utils/colors')

const secondary = {
  backgroundColor: colors.light[200],
  color: colors.light[500],
  '.ocean &': {
    backgroundColor: colors.ocean[500],
    color: colors.ocean[200],
  },
  '.ocean &:hover': {
    backgroundColor: colors.ocean[400],
  },
}
const secondaryOutlined = {
  border: '2px solid',
  borderColor: colors.light[300],
  color: colors.light[400],
  '&:hover': {
    backgroundColor: colors.light[200],
  },
  '.ocean &': {
    borderColor: colors.ocean[300],
    color: colors.ocean[200],
  },
  '.ocean &:hover': {
    backgroundColor: colors.ocean[600],
  },
}

module.exports = {
  secondary,
  'secondary.outlined': secondaryOutlined,
}
