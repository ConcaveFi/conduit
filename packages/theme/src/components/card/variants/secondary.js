const colors = require('../../../colors')

const secondary = {
  backgroundColor: colors.dark[20],

  '.ocean &': {
    backgroundColor: colors.blue[20],
  },
}
const secondaryOutlined = {
  backgroundColor: colors.dark[20],
  borderColor: colors.dark[30],
  border: '2px solid',
  '.ocean &': {
    borderColor: colors.blue[30],
    backgroundColor: colors.blue[20],
  },
}

module.exports = {
  'secondary-outlined': secondaryOutlined,
  secondary,
}
