import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import SetCookie from './components/SetCookie.vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },

 
  {
    path: '/setcookie',
    name: 'SetCookie',
    component: SetCookie,
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
