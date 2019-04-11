const DEFAULTS = {
  tokenType: 'Bearer',
  tokenName: 'Authorization',
  refreshTokenName: 'RefreshToken',
  tokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  globalToken: true
}

export default class JwtScheme {
  constructor (auth, options) {
    this.$auth = auth
    this.name = options._name

    this.options = Object.assign({}, DEFAULTS, options)
  }

  mounted () {
    // Sync token
    const token = this.$auth.syncToken(this.name)
    const refreshToken = this.$auth.syncRefreshToken(this.name)
    // Set axios token
    if (token) {
      this._setToken(token)
    }
    if (refreshToken) {
      this._setToken(refreshToken)
    }

    return this.$auth.fetchUserOnce()
  }

  _setToken (token) {
    if (this.options.globalToken) {
      // Set Authorization token for all axios requests
      this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, token)
    }
  }

  _setRefreshToken (token) {
    if (this.options.globalToken) {
      // Set Authorization token for all axios requests
      this.$auth.ctx.app.$axios.setHeader(this.options.refreshTokenName, token)
    }
  }

  _clearTokens () {
    if (this.options.globalToken) {
      // Clear Authorization token for all axios requests
      this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
      this.$auth.ctx.app.$axios.setHeader(this.options.refreshTokenName, false)
    }
  }

  async login (endpoint) {
    if (!this.options.endpoints.login) {
      return
    }

    // Ditch any leftover local tokens before attempting to log in
    this.logout()

    const result = await this.$auth.request(
      endpoint,
      this.options.endpoints.login
    )

    const token = this.options.tokenType
      ? `${this.options.tokenType} ${result[this.options.tokenKey || 'access_token']}`
      : result[this.options.tokenKey || 'access_token']

    this.$auth.setToken(this.name, token)
    this._setToken(token)

    const refreshToken = this.options.refreshTokenType
      ? `${this.options.refreshTokenType} ${result[this.options.refreshTokenKey || 'refresh_token']}`
      : result[this.options.refreshTokenKey || 'refresh_token']

    this.$auth.setRefreshToken(this.name, refreshToken)
    this._setRefreshToken(refreshToken)

    return this.fetchUser()
  }

  async fetchUser (endpoint) {
    if (!this.$auth.getToken(this.name)) {
      return
    }

    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    this.$auth.setUser(user)
  }

  async logout (endpoint) {
    // Only connect to logout endpoint if it's configured
    if (this.options.endpoints.logout) {
      await this.$auth
        .requestWith(this.name, endpoint, this.options.endpoints.logout)
        .catch(() => { })
    }
    // But logout locally regardless
    return this._logoutLocally()
  }

  _logoutLocally () {
    this._clearTokens()
    return this.$auth.reset()
  }
}
