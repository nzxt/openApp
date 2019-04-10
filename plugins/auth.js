export default ({ app, redirect }) => {
  const { $auth } = app

  $auth.onError((error, name, endpoint) => {
    console.error(endpoint, name, error)
  })

  // Only _actual_ login/outs (including resets) will be watched here.
  $auth.$storage.watchState('loggedIn', (isLoggedIn) => {
    // Follow @nuxtjs/auth workflow.
    !isLoggedIn && redirect('home')

    // const indexLocalePath = app.localePath('index')
    // !isLoggedIn && redirect('301', indexLocalePath)
  })

  console.log(`[AUTH] Hi, ${$auth.user.userName}!`)
}
