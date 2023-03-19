const colors = require('../../../colors')

const primary = {
  backgroundColor: colors.dark.accent,
  color: colors.dark[10],
  '.ocean &': {
    backgroundColor: colors.blue.accent,
    color: colors.blue[10],
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
