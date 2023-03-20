const colors = require('../../../colors')

const defaultProps = {
  '&:hover': {
    'text-decoration-line': 'underline',
  },
}

const underline = {
  color: colors.dark.accent,
  '.ocean &': {
    color: colors.blue.accent,
  },
  ...defaultProps,
}

module.exports = {
  underline,
}
