module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': 'off' // 0-off 1-warn 2-error
  }
}
