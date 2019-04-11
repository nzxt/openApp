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
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'indent': ['error', 2],
    'no-trailing-spaces': ['error'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'], // ['error', always', { 'omitLastInOneLineBlock': true }],
    'space-before-function-paren': ["error", "always"],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    // 'no-unused-vars': 'warn',
    // 'vue/no-v-html': 'warn',
    // 'vue/no-parsing-error': 'warn',
    // 'vue/no-unused-vars': 'warn',
    // 'vue/return-in-computed-property': 'warn',
    // 'vue/no-use-v-if-with-v-for': 'warn'
  }
}
