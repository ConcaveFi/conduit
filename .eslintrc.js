module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    'react/display-name': 'off',
  },
  settings: {
    next: {
      rootDir: ['frontend'],
    },
  },
}
