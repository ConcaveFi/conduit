const colors = require('../../../colors')

const secondary = {
  backgroundColor: colors.dark[30],
  color: colors.dark.accent,
  '.ocean &': {
    backgroundColor: colors.blue[30],
    color: colors.blue.accent,
  },
}
const secondaryOutlined = {
  border: '2px solid',
  // borderColor: colors.light[300],
  // color: colors.light[400],
  // '&:hover': {
  //   backgroundColor: colors.light[200],
  // },
  // '.ocean &': {
  //   borderColor: colors.ocean[300],
  //   color: colors.ocean[200],
  // },
  // '.ocean &:hover': {
  //   backgroundColor: colors.ocean[600],
  // },
}

module.exports = {
  secondary,
  'secondary.outlined': secondaryOutlined,
}
