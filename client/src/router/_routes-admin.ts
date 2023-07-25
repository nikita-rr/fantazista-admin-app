import { adminRoutesGuard } from './_guards';


export default {
  path: '/admin',
  component: () => import('~/layouts/Admin.vue'),
  beforeEnter: adminRoutesGuard,
  children: [
    {
      path: '',
      component: () => import('~/pages/admin/index.vue'),
    },
    {
      path: 'operators',
      component: () => import('~/pages/admin/operators.vue'),
      children: [
        {
          path: 'list',
          component: () => import('~/pages/admin/operators/list.vue'),
        },
        {
          path: 'detail/:id',
          component: () => import('~/pages/admin/operators/detail.vue'),
        },
        {
          path: 'create',
          component: () => import('~/pages/admin/operators/create.vue'),
        },
        {
          path: 'update/:id',
          component: () => import('~/pages/admin/operators/update.vue'),
        },
      ],
    },
  ],
};
