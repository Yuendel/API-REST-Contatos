/* eslint-disable linebreak-style */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-plusplus': 'off',
    'no-dupe-keys': 'off',
    'no-await-in-loop': 'off',
  },
};
