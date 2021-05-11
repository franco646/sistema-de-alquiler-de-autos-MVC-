module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    'no-param-reassign': 0,
  },
  plugins: [
    'node',
    'jest',
  ],
};
