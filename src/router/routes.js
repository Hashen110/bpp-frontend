const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/charts', component: () => import('pages/ChartsPage.vue') },
      { path: '/profile', component: () => import('pages/ProfilePage.vue') },
      { path: '/users', component: () => import('pages/UsersPage.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
