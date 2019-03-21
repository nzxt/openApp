<template lang="pug">
v-layout(column, justify-center, align-center)
  v-flex(xs12, sm8, md6)
    div.my-3.text-xs-center
      Logo
      VuetifyLogo
    v-card
      v-card-title.headline Welcome to the Vuetify + Nuxt.js template
      v-card-text
        p Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.
        .text-xs-right
          em
            small — John Leider
      v-card-actions
        v-btn.primary(flat, nuxt, to='/inspire') Continue
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Logo: () => import('~/components/Logo'),
    VuetifyLogo: () => import('~/components/VuetifyLogo')
  }
})
export default class IndexPage extends Vue {}
</script>
