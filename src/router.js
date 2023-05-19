import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Dashboard from './components/Dashboard.vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },


];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
