import Vue from 'vue';
import VueRouter from 'vue-router';
import { get } from '@/common/util';

const login = () => import(/* webpackChunkName: "login" */ '@/views/login.vue');
const admin = () => import(/* webpackChunkName: "admin" */ '@/views/admin.vue');
const search = () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue');
const tree = () => import(/* webpackChunkName: "tree" */ '@/views/tree/tree.vue');
const detail = () => import(/* webpackChunkName: "detail" */ '@/views/search/detail/detail.vue');
const lazy = () => import(/* webpackChunkName: "lazy" */ '@/views/lazy/lazy.vue');
const user = () => import(/* webpackChunkName: "user" */ '@/views/user/user.vue');
const item = () => import(/* webpackChunkName: "item" */ '@/views/item/item.vue');
const test = () => import(/* webpackChunkName: "test" */ '@/views/test/test.vue');
const chart = () => import(/* webpackChunkName: "chart" */ '@/views/chart/chart.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/admin',
    component: admin,
    beforeEnter: (to, from, next) => {
      const info = get('user');
      if (info) {
        next();
      } else {
        next('/login');
      }
    },
    children: [
      {
        path: '/',
        name: 'admin',
        redirect: 'user',

      },
      {
        path: 'search',
        name: 'search',
        component: search,
      },
      {
        path: 'tree',
        name: 'tree',
        component: tree,
      },
      {
        path: 'detail',
        name: 'detail',
        component: detail,
      },
      {
        path: 'lazy',
        name: 'lazy',
        component: lazy,
      },
      {
        path: 'user',
        name: 'user',
        component: user,
      },
      {
        path: 'item',
        name: 'item',
        component: item,
      },
      {
        path: 'chart',
        name: 'chart',
        component: chart,
      },
      {
        path: 'test',
        name: 'test',
        component: test,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
