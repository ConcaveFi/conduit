const btn = {
  'border-radius': '10px',
  transition: 'all 300ms ease-out',
  display: 'flex',
  gap: 8,
  '&:active': {
    transform: 'scale(0.95)',
  },
}

module.exports = {
  '.btn': { ...btn },
}
