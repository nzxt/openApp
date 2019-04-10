<template lang="pug">
v-container
  v-layout.my-3(justify-center)
    v-flex(xs12, sm10, md8, lg6)
      v-alert.error(v-model='loginHasError', icon='mdi-alert-decagram')
        | {{ 'Error while logging in..' }}
  v-layout(wrap, justify-center)
    v-flex(xs11, sm8, md6, lg5)
      v-card(class='elevation-7' min-width='320')
        //- v-img(contain, src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
        v-form(v-model='valid', @submit.prevent='signIn')
          v-card-title.justify-space-between.display-1.font-weight-thin.warning--text {{ $t('signin') }}
            v-icon.ml-2(color='grey', style='font-size:112px;' @click='$auth.fetchUser()') mdi-account-circle-outline
            v-chip.ma-0.px-1(dark color='grey' @click='signOut' v-if='$auth.loggedIn')
              v-icon.mdi-18px(left) mdi-logout-variant
              | {{ $t('signout')}}
            v-btn-toggle(v-else)
              //- v-btn(icon, value='local')
                v-icon.mdi-24px mdi-account-circle
              v-btn.px-1(icon, @click='googleSignIn')
                v-icon.mdi-24px.red--text mdi-google
              v-btn(icon, @click='facebookSignIn')
                v-icon.mdi-24px.blue--text mdi-facebook-box
              v-btn(icon, @click='twitterSignIn')
                v-icon.mdi-24px.light-blue--text mdi-twitter
          v-card-text
            v-text-field(
              v-model='username'
              :label='$t("username")'
              prepend-icon='mdi-account-box-outline'
              browser-autocomplete='username'
              :rules='[...requiredField, ...minLength]'
              clearable
            )
            v-text-field(
              v-model='password'
              :label='$t("password")'
              prepend-icon='mdi-textbox-password'
              :type='visible ? "text" : "password"'
              :append-icon='visible ? "mdi-eye-off" : "mdi-eye"'
              @click:append="visible = !visible"
              browser-autocomplete='current-password'
              :rules='[...requiredField, ...minLength]'
              clearable
            )
          v-card-actions.lighten-3
            v-btn.primary(
              dark flat block
              type='submit' :disabled='!valid'
            ) {{ $t('forms.submit') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AuthMixin from '~/mixins/auth'
import ValidateRules from '~/mixins/validate'

@Component({
  auth: false,
  mixins: [AuthMixin, ValidateRules]
})
export default class LoginPage extends Vue {
  valid: Boolean = false
  visible: Boolean = false
  username: string | null = 'admin'
  password: string | null = 'qwerty'
}
</script>

<style lang="stylus" scoped>
.theme--light.v-btn-toggle
  background: none
.v-btn-toggle--selected
  box-shadow: none
</style>
