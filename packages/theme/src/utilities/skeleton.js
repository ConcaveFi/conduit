const colorValues = require('../lib/colorValues')

// These classes should be userd with "animate-skeleton" (../animation.js)
// to work properly you have to set up a  color to start (--skeleton-from)
// and another one to end (--skeleton-to), if used with animate-skeleton
// these two colors will be transitioning among each other in loop

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
