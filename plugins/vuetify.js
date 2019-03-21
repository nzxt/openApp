import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import en from 'vuetify/es5/locale/en'
import uk from 'vuetify/es5/locale/uk'
import ru from 'vuetify/es5/locale/ru'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { en, uk, ru },
    current: 'en'
  },
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
