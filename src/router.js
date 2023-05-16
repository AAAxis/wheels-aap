import Vue from 'vue'
import VueRouter from 'vue-router'

import StartupPage from '../components/StartupPage.vue'
import UserLogin from '../components/UserLogin.vue'
import UserRegister from '../components/UserRegister.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: StartupPage },
  { path: '/user_login', component: UserLogin },
  { path: '/user_register', component: UserRegister }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
