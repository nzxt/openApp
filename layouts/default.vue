<template lang="pug">
v-app(:dark='darkTheme' v-hotkey='keymap')
  v-navigation-drawer(dark class='tertiary' v-model='primaryDrawer.model' :mini-variant='primaryDrawer.mini' :clipped='primaryDrawer.clipped' fixed stateless app)
    v-img(
      src='https://cdn.vuetifyjs.com/images/parallax/material2.jpg'
      class='fill-height repeating-gradient'
    )
      v-layout.lightbox.white--text(column fill-height)
        v-list(two-line)
          v-list-tile(v-for='(item, i) in items' :key='i' :to='item.to' router exact)
            v-list-tile-action
              v-icon.mdi-36px {{ item.icon }}
            v-list-tile-content
              v-list-tile-title.title(v-text='item.title')
              v-list-tile-sub-title.body-2(v-text='item.description')
        v-list(py-0 dense)
          v-list-tile
            v-list-tile-action
              v-switch(v-model='darkTheme' color='primary')
            v-list-tile-content
              | Night Mode
        v-spacer
        v-flex(pa-2 shrink v-show='primaryDrawer.model && !primaryDrawer.mini' transition='fade-transition')
          div.title molfarDevs
          div.subheading molfarDevs@gmail.com
  v-toolbar(:clipped-left='primaryDrawer.clipped' fixed app)
    //- v-toolbar-side-icon(@click='drawer = !drawer')
    // v-btn(icon flat @click.stop.prevent @click='primaryDrawer.model = !primaryDrawer.model')
    tasty-burger-button.mr-3(
      :active.sync='primaryDrawer.model'
      @toggle='primaryDrawer.model = !primaryDrawer.model'
      type='elastic'
      size='m'
      color='orange'
      active-color='red'
    )
    v-btn.light-blue.lighten-5(small flat round @click.stop='primaryDrawer.mini = !primaryDrawer.mini')
      // v-icon {{ `mdi-chevron-left-${primaryDrawer.mini ? 'right' : 'left'}` }}
      v-icon.mdi-24px(left color='grey') {{ `mdi-toggle-switch${primaryDrawer.mini ? '-off' : ''}` }}
      span.grey--text.caption {{ primaryDrawer.mini ? 'Mini' : 'Wide'}}
    v-btn.hidden-sm-and-down(small icon @click.stop='primaryDrawer.clipped = !primaryDrawer.clipped')
      v-icon mdi-application
    v-btn.hidden-sm-and-down(small icon @click.stop='footer.inset = !footer.inset')
      v-icon.mdi-18px mdi-color-helper
    v-toolbar-title.headline.font-weight.bold.hidden-sm-and-down(v-html='$t("title_html")')
    v-toolbar-title.headline.font-weight.bold.hidden-md-and-up(v-html='$t("short_title_html")')
    v-spacer
    LocaleSwitcher
    v-spacer
    v-btn(icon @click.stop='secondaryDrawer.model = !secondaryDrawer.model')
      v-icon.mdi-24px(color='grey') mdi-message-reply
  v-content
    v-container
      nuxt
  v-navigation-drawer(v-model='secondaryDrawer.model' :right='true' width='320' temporary fixed)
    v-list
      v-list-tile(@click='secondaryDrawer.model = !secondaryDrawer.model')
        v-list-tile-action
          v-icon.mdi-24px mdi-message-reply-text
        v-list-tile-title.title.text-uppercase Action Center
  v-footer.justify-center(:inset='footer.inset' height='24' class='grey lighten-3' app)
    span.px-3.caption.font-weight-bold.grey--text openApp &copy; {{ $moment().format('YYYY') }}. Powered by molfarDevs
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { IDrawer, IMenuItem } from '~/types/interfaces' // eslint-disable-line
import { menuItems } from '~/assets/navigation'

@Component({
  components: {
    LocaleSwitcher: () => import('~/components/LocaleSwitcher.vue')
  }
})
export default class DefaultLayout extends Vue {
  darkTheme: Boolean = false
  primaryDrawer: IDrawer = {
    model: true,
    clipped: true,
    mini: true
  }
  secondaryDrawer: IDrawer = {
    model: false
  }
  footer = {
    inset: true
  }
  items: IMenuItem[] = menuItems

  get keymap () {
    return {
      'alt+left': () => { this.primaryDrawer.model = !this.primaryDrawer.model },
      'alt+right': () => { this.secondaryDrawer.model = !this.secondaryDrawer.model }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-footer
    min-height 24px

  .bottom-gradient
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px)

  .repeating-gradient
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      )
</style>
