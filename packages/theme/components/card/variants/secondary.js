const colors = require('../../../utils/colors')

const secondary = {
  backgroundColor: colors.ocean[500],
}
const secondaryOutlined = {
  ...secondary,
  border: '2px solid',
  borderColor: `${colors.ocean[300]}60`,
}

module.exports = {
  'secondary-outlined': secondaryOutlined,
  secondary,
}
