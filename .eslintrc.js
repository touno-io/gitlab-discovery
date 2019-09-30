module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotemark": [true, "single"],
    "indent": [2, 'tab'],
    "interface-name": false,
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "no-consecutive-blank-lines": false,
    "import-spacing": false,
    "strictPropertyInitialization": false,
    "strict": 2,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
