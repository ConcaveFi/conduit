const colors = require('../../../utils/colors')

const primary = {
  backgroundColor: colors.light[100],
  color: colors.light[500],
  '.ocean &': {
    backgroundColor: colors.ocean[700],
    color: colors.ocean[200],
  },
  '.ocean &:hover': {
    backgroundColor: colors.ocean[500],
  },
}

const primaryOutlined = {
  border: '2px solid',
  borderColor: colors.light[400],
  color: colors.light[500],
  '&:disabled': {
    color: colors.light[400],
  },
  '.ocean &': {
    borderColor: colors.ocean[500],
    color: colors.ocean[200],
  },
  '.ocean &:disabled': {
    color: colors.ocean[300],
  },
}

module.exports = {
  primary,
  'primary.outlined': primaryOutlined,
}
