const colorValues = require('../lib/colorValues')

function skeletonFrom(value) {
  return { '--skeleton-from': value }
}

function skeletonTo(value) {
  return { '--skeleton-to': value }
}
const options = {
  values: colorValues(),
}

module.exports = [
  { utility: { 'skeleton-from': skeletonFrom }, options },
  { utility: { 'skeleton-to': skeletonTo }, options },
]
