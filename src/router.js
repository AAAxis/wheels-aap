import { createRouter, createWebHistory } from 'vue-router';
import StartupPage from './components/StartupPage.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';


const routes = [
  {
    path: '/startup_page',
    name: 'StartupPage',
    component: StartupPage,
  },
  {
    path: '/user_login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/user_register',
    name: 'UserRegister',
    component: UserRegister,
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
