import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AuthMixin extends Vue {
  $noty: any
  $auth: any
  username!: string
  password!: string
  /**
   * This define if login got an error
   * @type {boolean}
   */
  loginHasError: Boolean = false

  /**
   * Login method using auth-module with custom post-request
   * logic, using toast module to show information, success
   * and error messages.
   *
   * @returns {Promise<T>}
   */
  async localSignIn () {
    this.$noty.show('<span class="subheading">Log in...</span>')
    await this.$auth.loginWith('local', {
      data: {
        username: this.username,
        password: this.password
      }
    }).then(() => {
      this.$noty.success('Successfully connected')
    }).catch((err) => {
      this.$noty.error('Error while connecting: ' + err.message)
      this.loginHasError = true
    })
  }

  /**
   * Logout method using auth-module with custom post-request
   * logic, using toast module to show information, success
   * and error messages.
   *
   * @returns {Promise<void>}
   */
  async signOut () {
    this.$noty.show('<span class="subheading">Logging out...</span>')
    await this.$auth.logout().then(() => {
      this.$noty.success('Successfully disconnected')
    }).catch((err) => {
      this.$noty.error('Error while disconnecting: ' + err.message)
    })

    // If you are not fond of using axios promises on async calls
    // You can still use Javascript try and catch block
    //
    // try {
    //   this.$toast.show('Logging out...')
    //   await this.$auth.logout()
    //   this.$toast.success('Successfully disconnected')
    // } catch (err) {
    //   this.$toast.error('Error while disconnecting: ' + err.message)
    // }
  }

  async googleSignIn () {
    this.$noty.show('<span class="subheading">Log in w/ Google...</span>')
    await this.$auth.loginWith('google').catch((e) => {
      this.$noty.error('Error', e.message)
    })
  }

  async facebookSignIn () {
    this.$noty.show('<span class="subheading">Log in w/ Facebook...</span>')
    await this.$auth.loginWith('facebook').catch((e) => {
      this.$noty.error('Error', e.message)
    })
  }

  async twitterSignIn () {
    this.$noty.show('<span class="subheading">Log in w/ Twitter...</span>')
    await this.$auth.loginWith('twitter').catch((e) => {
      this.$noty.error('Error', e.message)
    })
  }
}
