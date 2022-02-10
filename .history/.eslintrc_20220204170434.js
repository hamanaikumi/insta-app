module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // Pagesの名前を自由に付けれるようにした?
    'vue/multi-word-component-names': 'off',
    eslint no-unused-expressions: "off" 
  },
}
