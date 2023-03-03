const glass = require('./glass')
const primary = require('./primary')
const secondary = require('./secondary')

module.exports = {
  ...glass,
  ...primary,
  ...secondary,
}
