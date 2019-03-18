<template lang="pug">
v-app(dark)
  v-navigation-drawer(v-model='drawer', :mini-variant='miniVariant', :clipped='clipped', fixed, app)
    v-list
      v-list-tile(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title(v-text='item.title')
  v-toolbar(:clipped-left='clipped', fixed, app)
    v-toolbar-side-icon(@click='drawer = !drawer')
    v-btn(icon, @click.stop='miniVariant = !miniVariant')
      v-icon {{ `chevron_${miniVariant ? 'right' : 'left'}` }}
    v-btn(icon, @click.stop='clipped = !clipped')
      v-icon web
    v-btn(icon, @click.stop='inset = !inset')
      v-icon remove
    v-toolbar-title(v-html='`${$t(title)}`')
    v-spacer
    LocaleSwitcher
    v-spacer
    v-btn(icon, @click.stop='rightDrawer = !rightDrawer')
      v-icon menu
  v-content
    v-container
      nuxt
  v-navigation-drawer(v-model='rightDrawer', :right='right', temporary, fixed)
    v-list
      v-list-tile(@click.native='right = !right')
        v-list-tile-action
          v-icon(light) compare_arrows
        v-list-tile-title Switch drawer (click me)
  v-footer.px-3(:inset='inset', app)
    span © 2019
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
  clipped: Boolean = false
  drawer: Boolean = false
  inset: Boolean = false
  miniVariant: Boolean = false
  right: Boolean = true
  rightDrawer: Boolean = false
  items: Array<menuItem> = [
    {
      icon: 'apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'bubble_chart',
      title: 'Inspire',
      to: '/inspire'
    }
  ]
}
</script>
