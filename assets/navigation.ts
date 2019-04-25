import { IMenuItem } from '~/types/interfaces' // eslint-disable-line

export const menuItems: IMenuItem[] = [
  {
    icon: 'mdi-xml',
    title: 'Welcome',
    description: 'Main Application Page',
    to: '/'
  },
  {
    icon: 'mdi-account-search',
    title: 'Accounts',
    description: 'Dev Accounts Page',
    to: '/devs'
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
