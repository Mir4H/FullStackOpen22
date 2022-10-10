module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    'linebreak-style': ['error', 'unix'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'no-unused-vars': 'off'
  }
}
