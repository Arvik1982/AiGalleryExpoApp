// https://docs.expo.dev/guides/using-eslint/
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  eslintPluginPrettierRecommended,
])
