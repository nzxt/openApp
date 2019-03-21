<template lang="pug">
  v-layout.wrapper(row, align-center)
    div.hidden-xs-only
      v-tooltip(v-for='locale in $i18n.locales', :key='locale.code', bottom)
        v-btn.ma-0(slot='activator', small, icon, @click='onLocaleSwitch(locale.code)')
          flag(:iso='locale.flag', :title='locale.iso')
        span {{ locale.name }}

    div.hidden-sm-and-up
      flag(:iso='$i18n.locale')
</template>

<script>
export default {
  name: 'LocaleSwitcher',

  methods: {
    onLocaleSwitch (code) {
      this.$moment.locale(code)
      this.$vuetify.lang.current = code
      this.$router.replace(this.switchLocalePath(code))
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  max-width 110px

.flag-icon
  font-size 18px
  border-radius 50%
</style>
