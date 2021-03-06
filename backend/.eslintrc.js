module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
    'no-unused-vars': ['error', {argsIgnorePattern: 'next'}],
  },
};
