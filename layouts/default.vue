<template lang="pug">
v-app(:dark='darkTheme')
  v-navigation-drawer(v-model='primaryDrawer.model' :mini-variant='primaryDrawer.mini' :clipped='primaryDrawer.clipped' fixed app)
    v-list
      v-list-tile(v-for='(item, i) in items' :key='i' :to='item.to' router exact)
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title.title(v-text='item.title')
    v-list
      v-list-tile
        v-list-tile-action
          v-switch(v-model='darkTheme' color='primary')
        v-list-tile-content
          | Night Mode
  v-toolbar(:clipped-left='primaryDrawer.clipped' fixed app)
    //- v-toolbar-side-icon(@click='drawer = !drawer')
    v-btn(icon)
      tasty-burger-button(@toggle='primaryDrawer.model = !primaryDrawer.model' :active='primaryDrawer.model' type='elastic' size='s' color='orange' active-color='red')
    v-btn(small icon @click.stop='primaryDrawer.mini = !primaryDrawer.mini')
      v-icon {{ `mdi-chevron-double-${primaryDrawer.mini ? 'right' : 'left'}` }}
    v-btn(small icon @click.stop='primaryDrawer.clipped = !primaryDrawer.clipped')
      v-icon mdi-application
    v-btn(small icon @click.stop='footer.inset = !footer.inset')
      v-icon.mdi-18px mdi-color-helper
    v-toolbar-title.headline.font-weight.bold(v-html='$t("title_html")')
    v-spacer
    LocaleSwitcher
    v-spacer
    v-btn(icon @click.stop='rightDrawer = !rightDrawer')
      v-icon mdi-message-reply
  v-content
    v-container
      nuxt
  v-navigation-drawer(v-model='secondaryDrawer.model' temporary fixed)
    v-list
      v-list-tile(@click.native='rightDrawer = !rightDrawer')
        v-list-tile-action
          v-icon mdi-message-reply-text
        v-list-tile-title.title.text-uppercase Action Center
  v-footer(:inset='footer.inset' height='24' class='grey lighten-3' app)
    span.px-3.caption.font-weight-bold.grey--text openApp &copy; {{ $moment().format('YYYY') }}. Powered by molfarDevs
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface menuItem {
  icon: string;
  title: string;
  to: string;
}

@Component({
  components: {
    LocaleSwitcher: () => import('~/components/LocaleSwitcher.vue')
  }
})
export default class DefaultLayout extends Vue {
  darkTheme: Boolean = false
  primaryDrawer = {
    model: false,
    clipped: false,
    mini: false
  }
  secondaryDrawer = {
    model: null
  }
  footer = {
    inset: false
  }
  items: Array<menuItem> = [
    {
      icon: 'mdi-xml',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-lock-pattern',
      title: 'Inspire',
      to: '/inspire'
    },
    {
      icon: 'mdi-login-variant',
      title: 'LogIn',
      to: '/login'
    }
  ]
}
</script>

<style lang="stylus" scoped>
  .v-footer
    min-height 24px
</style>
