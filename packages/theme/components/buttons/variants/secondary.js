const colors = require('../../../utils/colors')
//   secondary: 'bg-ocean-500 rounded-full hover:bg-ocean-400 text-ocean-200 fill-ocean-200',
//   'secondary.underline':
//     'border-2 border-ocean-300 rounded-full hover:bg-ocean-600 transition-all  text-ocean-200 fill-ocean-200',

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
  color: colors.ocean - [200],
  '&:hover': {
    backgroundColor: colors.ocean[600],
  },
}

module.exports = {
  secondary,
  'secondary.outlined': (secondaryOutlined = {}),
}
