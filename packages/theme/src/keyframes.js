// This keyframe will be mostly responsible to make ripple effects
const expand = {
  '0%': {
    width: '0%',
    height: '0%',
    opacity: 0.5,
  },
  '100%': {
    width: '150%',
    height: '150%',
    opacity: 0,
  },
}

// color-transition will be mostly responsible to make skeleton objects
// If you are looking for more info about skeletons
// go to ./utilities/skeleton.js
const colorTransition = {
  '0%': { backgroundColor: 'var(--skeleton-from)' },
  '50%': { backgroundColor: 'var(--skeleton-to)' },
  '100%': { backgroundColor: 'var(--skeleton-from)' },
}

const keyframes = {
  expand,
  'color-transition': colorTransition,
}

module.exports = keyframes
