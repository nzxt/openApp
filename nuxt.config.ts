require('dotenv').config()
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package.json'
const i18n = require('./config/i18n')

const isDev = process.env.NODE_ENV !== 'production'
const BASE_URL = process.env.API_URL || 'http://localhost:3003'

export default {
  mode: 'spa',
  modern: !isDev,

  /*
  ** Manifest
  */
  manifest: {
    name: 'openApp',
    short_name: 'opA',
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
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Exo+2:100,300,400,500,700,900&amp;subset=cyrillic'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    ['nuxt-i18n', i18n],
    ['@nuxtjs/dotenv', { filename: '.env' }],
    ['@nuxtjs/moment', { locales: ['uk', 'ru'],  defaultLocale: 'en',  plugin: true }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    debug: isDev,
    baseURL: BASE_URL
  },

 /*
  ** Auth module configuration
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          logout: false,
          user: { url: '/users/2', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      },
      facebook: {
        client_id: '<your_facebook_app_id>',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
        scope: ['public_profile', 'email']
      },
      google: {
        client_id: '<your_google_oauth_id>'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      user: '/profile',
      home: '/',
      callback:'/callback'
    }
  },
  router: {
    middleware: 'auth'
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true,
      silent: !isDev,
      performance: isDev
    }
  },

  /*
  ** Build configuration
  */
  build: {
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
