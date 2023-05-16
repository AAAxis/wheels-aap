import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
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
