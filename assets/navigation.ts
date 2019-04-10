import { IMenuItem } from '~/types/interfaces' // eslint-disable-line

export const menuItems: IMenuItem[] = [
  {
    icon: 'mdi-account-search',
    title: 'SAC',
    description: 'Sales Assessment Center',
    to: '/sac'
  },
  {
    icon: 'mdi-xml',
    title: 'Welcome',
    description: 'Main Application Page',
    to: '/'
  },
  {
    icon: 'mdi-lock-pattern',
    title: 'Inspire',
    description: 'Inspire Page',
    to: '/inspire'
  },
  {
    icon: 'mdi-login-variant',
    title: 'LogIn',
    description: 'SignIn into Account',
    to: '/login'
  }
]
