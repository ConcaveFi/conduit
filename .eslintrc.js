module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'turbo', 'prettier'],
  ignorePatterns: ['node_modules'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    'react/display-name': 'off',
  },
  settings: {
    next: {
      rootDir: ['frontend'],
    },
  },
}
