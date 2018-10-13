import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Results from '@/components/Results'
import People from '@/components/People'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, 
    {
      path: '/home',
      name: 'Home',
      component: Home
    }, 
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/people',
      name: 'People',
      component: People
    }
  ]
})