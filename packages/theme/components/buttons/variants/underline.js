const colors = require('../../../utils/colors')

const defaultProps = {
  '&:hover': {
    'text-decoration-line': 'underline',
  },
}

const underline = {
  color: colors.light[500],
  '.ocean &': {
    color: colors.ocean[200],
  },
  ...defaultProps,
}

const underlineSecondary = {
  color: colors.light[600],
  '.ocean &': {
    color: colors.ocean[300],
  },
  ...defaultProps,
}

module.exports = {
  underline,
  'underline.secondary': underlineSecondary,
}
