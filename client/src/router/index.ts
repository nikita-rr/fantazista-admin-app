import { createRouter, createWebHistory } from 'vue-router';
import RoutesAdmin from './_routes-admin';
import RoutesOperator from './_routes-operator';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/auth',
      component: () => import('~/layouts/Auth.vue'),
      name: 'auth',
      children: [
        {
          path: 'login',
          component: () => import('~/pages/Login.vue'),
          name: 'login',
        },
      ],
    },
    RoutesAdmin,
    RoutesOperator,
  ],
});
export { router };
