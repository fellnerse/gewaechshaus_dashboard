import colors from 'vuetify/es5/util/colors'

const base = '/gewaechshaus_dashboard'
const isDev = process.env.NODE_ENV !== 'production'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base,
  },
  static: {
    prefix: base,
  },

  publicRuntimeConfig: {
    base,
    isDev,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - gewaechshaus_dashboard',
    title: 'gewaechshaus_dashboard',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/localStorageWriter.client.js',
    '~/plugins/utils.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/firebase', '@nuxtjs/apollo'],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://192.168.178.254:4000/graphql',
      },
    },
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyAGnyxgPpUy6AaPOSdQwvZHZGiTrABJBpY',
      authDomain: 'gewaechshaus-f84e2.firebaseapp.com',
      databaseURL:
        'https://gewaechshaus-f84e2-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'gewaechshaus-f84e2',
      storageBucket: 'gewaechshaus-f84e2.appspot.com',
      messagingSenderId: '4693107437',
      appId: '1:4693107437:web:6f7a15208a589a57d4a2e4',
    },
    services: {
      firestore: {
        memoryOnly: false, // default
        chunkName: isDev ? 'firebase-auth' : '[id]', // default
        enablePersistence: true,
        // emulatorPort: process.env.NODE_ENV === 'development' ? 9090 : undefined,
        emulatorPort: undefined,
        settings: {
          // Firestore Settings - currently only works in SPA mode
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true,
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev }) {
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
      // config.module.rules.push({
      //   enforce: 'pre',
      //   test: /\.txt$/,
      //   loader: 'raw-loader',
      //   exclude: /(node_modules)/,
      // })
    },
    analyze: false,
  },
  server: {
    host: '0.0.0.0',
    port: 80,
  },
}
