require('dotenv').config()
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package.json'
const i18n = require('./config/i18n')

const isDev = process.env.NODE_ENV !== 'production'

const {
  BASE_URL = 'http://localhost:3000'
 } = process.env

export default {
  mode: 'spa',

  modern: !isDev,

  /*
  ** Manifest
  */
  manifest: {
    name: 'molfarDevelopers',
    short_name: 'molfarDevs',
    description: 'NuxtJS boilerplate for scaffolding something new',
    theme_color: '#188269'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Exo+2:100,300,400,500,700,900&amp;subset=cyrillic' }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0022bb' },

  /*
  ** Global CSS
  */
  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuejs-noty/dist/vuejs-noty.css',
    '~/assets/style/app'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/axios',
    '@/plugins/vuetify',
    '@/plugins/noty',
    '@/plugins/hotkey',
    '@/plugins/eventbus',
    '@/plugins/spinners',
    '@/plugins/flag-icon',
    '@/plugins/tasty-burger-button'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/dotenv', { filename: '.env' }],
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    ['nuxt-i18n', i18n],
    ['@nuxtjs/moment', { locales: ['uk', 'ru'],  defaultLocale: 'en',  plugin: true }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    debug: isDev,
    proxy: true,
    // baseURL: BASE_URL
  },
  proxy: {
    '/api': BASE_URL
  },

 /*
  ** Auth module configuration
  */
  auth: {
    strategies: {
      local: {
        _scheme: '~/services/jwt-strategy.js',
        endpoints: {
          user: { url: `/api/auth/user`, method: 'get', propertyName: 'user' },
          login: { url: `/api/auth/login`, method: 'post', propertyName: '' },
          logout: { url: `/api/auth/logout`, method: 'get' }
        }
        // tokenType: 'Bearer',
        // tokenKey: 'access_token',
      },
      auth0: {
        domain: 'nzxt.auth0.com',
        client_id: 'wMKQRddoM79cMrcbk6yAohRXkhJpe-Rn'
      },
      facebook: {
        client_id: '1671464192946675',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        client_id: '956748748298-kr2t08kdbjq3ke18m3vkl6k843mra1cg.apps.googleusercontent.com'
      },
      twitter: {
        client_id: 'FAJNuxjMTicff6ciDKLiZ4t0D'
      }
    },
    resetOnError: true,
    redirect: {
      home: '/',
      login: '/login',
      logout: '/',
      callback: '/callback'
    },
    cookie: false,
    plugins: ['~/plugins/auth']
  },

  serverMiddleware: ['../services/auth'],

  /*
  ** Router config
  */
  router: {
    middleware: ['auth']
  },

  vue: {
    config: {
      devtools: true,
      silent: !isDev,
      performance: isDev,
      productionTip: false
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    },
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
