import Vue from 'vue';
import VueRouter from 'vue-router';
import Page404 from '../views/Page404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginPage.vue'),
  },
  {
    path: '/main',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/',
        name: 'main',
        redirect: 'chartPage',
      },
      {
        path: 'chartPage',
        name: 'chartPage',
        component: () => import(/* webpackChunkName: "a" */ '../views/material/shopChart.vue'),
      },
      {
        path: 'listOrigin',
        name: 'listOrigin',
        component: () => import(/* webpackChunkName: "b" */ '../views/material/todolist.vue'),
      },
      {
        path: 'listFinal',
        name: 'listFinal',
        component: () => import(/* webpackChunkName: "c" */ '../views/material/todolist-v.vue'),
      },
    ],
  },
  // ? 404页面
  {
    path: '/*',
    component: Page404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
