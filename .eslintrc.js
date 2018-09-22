module.exports = {
  root: true,
  parserOptions: {
   "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  env: {
    browser: true,
    node: true
  },
  "extends": [
    "airbnb-base",
    "plugin:vue/recommended"
  ],
  globals: {
    __static: true
  },
  plugins: [
    'vue'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.jsx','.vue']
      }
    }
  }
}