import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Dashboard from './components/Dashboard.vue';
import SetCookie from './components/SetCookie.vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
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
