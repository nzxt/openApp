module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser' // or 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  // add your custom rules here
  rules: {
    'indent': ['error', 2],
    'no-trailing-spaces': ['error'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'], // ['error', always', { 'omitLastInOneLineBlock': true }],
    'space-before-function-paren': ["error", "always"],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true
//   },
//   parserOptions: {
//     parser: 'babel-eslint',
//     ecmaFeatures: {
//       "legacyDecorators": true
//     }
//   },
//   extends: [
//     '@nuxtjs',
//     'plugin:nuxt/recommended'
//   ],
//   // add your custom rules here
//   rules: {
//   }
// }
