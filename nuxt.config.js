import TerserPlugin from 'terser-webpack-plugin'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Zipangram',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // iOS用のアイコン
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/apple-touch-icon.png',
      },
      // fontAwesome icon CDN
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
        // href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
      },
      // fontAwesomeのアニメーション CDN
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome-animation/0.2.1/font-awesome-animation.css',
        type: 'text/css',
        media: 'all',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Netlify デプロイのため
  ssr: true,
  target: 'static',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-cropper', mode: 'client' },
    { src: '~/plugins/vue-js-modal.js', mode: 'client' },
    { src: '~/plugins/amCharts.js', mode: 'client' },
    { src: '~/plugins/persistedstate.js', mode: 'client' },
    { src: '~/plugins/swiper', mode: 'client' },
    // { src: '~/plugins/skelton', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { parseJSON: false }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['amCharts'],
    vendor: ['vue-cropperjs'],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: false,
        }),
      ],
    },
  },
  // ローディング
  loading: '~/components/Loading.vue',
  // :idのリロード問題
    generate: {
    fallback: true
  },
}
