<template lang="pug">
v-container
  v-layout(justify-center)
    v-flex(xs12, sm10, md8, lg6)
      v-alert.error(v-model='loginHasError', icon='mdi-alert-decagram')
        | {{ 'Error while logging in..' }}
  v-layout(wrap, justify-center)
    v-flex(xs11, sm8, md6, lg4)
      v-card(color='blue-grey lighten-5')
        //- v-img(contain, src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
        v-form(v-model='valid', @submit.prevent='localSignIn')
          v-card-title.justify-center.display-1.blue-grey.lighten-5.font-weight-thin.warning--text {{ $t('signin') }}
            v-spacer
            v-btn(icon, @click='signOut', v-if='$auth.loggedIn')
              v-icon.mdi-24px mdi-logout-variant

            v-btn-toggle(v-else)
              //- v-btn(icon, value='local')
                v-icon.mdi-24px mdi-account-circle
              v-btn(icon, @click='facebookSignIn')
                v-icon.mdi-24px mdi-facebook-box
              v-btn(icon, @click='googleSignIn')
                v-icon.mdi-24px mdi-google
          v-card-text
            v-text-field(
              v-model='login',
              :label='$t("login")',
              prepend-icon='mdi-account-box-outline',
              browser-autocomplete='username',
              clearable
              :rules='[...requiredField, ...minLength]'
            )
            v-text-field(
              v-model='password',
              :label='$t("password")',
              prepend-icon='mdi-textbox-password',
              :type='visible ? "text" : "password"',
              :append-icon='visible ? "mdi-eye-off" : "mdi-eye"',
              @click:append="visible = !visible"
              browser-autocomplete='current-password',
              :rules='[...requiredField, ...minLength]'
              clearable
            )
          v-card-actions.blue-grey.lighten-4
            v-btn.primary(flat, block, type='submit', :disabled='!valid') {{ $t('forms.submit') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthMixin from '~/mixins/auth'
import ValidateRules from '~/mixins/validate'

@Component({
  // auth: false,
  mixins: [AuthMixin, ValidateRules]
})
export default class LoginPage extends Vue {
  valid: Boolean = false
  visible: Boolean = false
  login: string | null = 'admin'
  password: string | null = 'qwerty'

  get username (): string | null {
    return `${this.login}@example.com`
  }
}
</script>

<style lang="stylus" scoped>
.theme--light.v-btn-toggle
  background: none
.v-btn-toggle--selected
  box-shadow: none
</style>
