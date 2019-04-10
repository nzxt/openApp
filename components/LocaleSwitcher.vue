<template lang="pug">
  v-layout.wrapper(row align-center)
    div.hidden-xs-only
      v-tooltip(v-for='locale in $i18n.locales' :key='locale.code' bottom)
        template(v-slot:activator='{ on }')
          v-btn.ma-0(
            small icon
            v-on='on'
            @click='onLocaleSwitch(locale.code)'
            :class='locale.code === currentLocale.code ? "v-btn--active" : ""'
          )
            flag(:iso='locale.flag' :title='locale.iso')
        span {{ locale.name }}

    div.hidden-sm-and-up
      v-menu(open-on-hover bottom offset-y)
        template(v-slot:activator='{ on }')
          v-chip(small v-on='on')
            v-avatar
              flag(:iso='currentLocale.flag')
            span.caption {{ currentLocale.name }}
              //- v-icon.mdi-18px(right) mdi-menu-down
        v-list.py-0(dense)
          v-list-tile.px-0(
            v-for='locale in $i18n.locales'
            :key='locale.code'
            @click='onLocaleSwitch(locale.code)'
          )
            v-list-tile-avatar
              flag(:iso='locale.flag')
            v-list-tile-title {{ locale.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILocale } from '~/types/interfaces' // eslint-disable-line

@Component({})
export default class LocaleSwitcher extends Vue {
  onLocaleSwitch (code): void {
    this.$moment.locale(code)
    this.$vuetify.lang.current = code
    this.$router.replace(this.switchLocalePath(code))
  }

  get currentLocale (): ILocale {
    return this.$i18n.locales.find(x => x.code === this.$i18n.locale)
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  max-width 84px

.flag-icon
  font-size 22px
  border-radius 50%
</style>
