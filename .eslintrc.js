module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'turbo'],
  ignorePatterns: ['node_modules'],
  rules: {
    'react/display-name': 'off',
  },
  settings: {
    next: {
      rootDir: ['frontend'],
    },
  },
}
