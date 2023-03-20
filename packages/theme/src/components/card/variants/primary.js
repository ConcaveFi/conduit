const colors = require('../../../colors')

const primary = {
  backgroundColor: colors.dark[10],
  '.ocean &': {
    backgroundColor: colors.blue[10],
  },
}

const primaryOutlined = {
  backgroundColor: colors.dark[10],
  border: '2px solid',
  borderColor: colors.dark[20],
  '.ocean &': {
    backgroundColor: colors.blue[10],
    borderColor: colors.blue[20],
  },
}

module.exports = {
  'primary-outlined': primaryOutlined,
  primary,
}
