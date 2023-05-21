import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Navbar from './components/Navbar.vue';
import SetCookie from './components/SetCookie.vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: Navbar,
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
