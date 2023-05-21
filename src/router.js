import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import History from './components/History.vue';
import Cart from './components/Cart.vue';
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
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
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
