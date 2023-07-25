import { operatorRoutesGuard } from './_guards';

export default {
  path: '/',
  component: () => import('~/layouts/Operator.vue'),
  beforeEnter: operatorRoutesGuard,
  children: [
    {
      path: '',
      component: () => import('~/pages/operator/clients.vue'),
      children: [
        {
          path: '',
          component: () => import('~/pages/operator/clients/list.vue'),
        },
        {
          path: '/clients/detail/:id',
          component: () => import('~/pages/operator/clients/detail.vue'),
        },
        {
          path: '/clients/create',
          component: () => import('~/pages/operator/clients/create.vue'),
        },
        {
          path: '/clients/update/:id',
          component: () => import('~/pages/operator/clients/update.vue'),
        },
      ],
    },
    {
      path: 'contracts',
      component: () => import('~/pages/operator/contracts.vue'),
      children: [
        {
          path: '',
          component: () => import('~/pages/operator/contracts/list.vue'),
        },
        {
          path: 'detail/:id',
          component: () => import('~/pages/operator/contracts/detail.vue'),
        },
        {
          path: 'create',
          component: () => import('~/pages/operator/contracts/create.vue'),
        },
        {
          path: 'update/:id',
          component: () => import('~/pages/operator/contracts/update.vue'),
        },
      ],
    },
    {
      path: 'tables',
      component: () => import('~/pages/operator/tables.vue'),
      children: [
        {
          path: '',
          component: () => import('~/pages/operator/tables/list.vue'),
        },
        {
          path: 'detail/:id',
          component: () => import('~/pages/operator/tables/detail.vue'),
        },
        {
          path: 'create',
          component: () => import('~/pages/operator/tables/create.vue'),
        },
        {
          path: 'update/:id',
          component: () => import('~/pages/operator/tables/update.vue'),
        },
      ],
    },
  ],
};
