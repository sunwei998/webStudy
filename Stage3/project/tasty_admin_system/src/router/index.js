import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';
// ? 引入get获取localstorage
import { get } from '@/common/util';
// ? 引入组件文件
const loginPage = () => import(/* webpackChunkName: "loginPage" */ '@/views/loginPage.vue');
const adminPage = () => import(/* webpackChunkName: "adminPage" */ '@/views/adminPage.vue');
const restaurant = () => import(/* webpackChunkName: "restaurant" */ '@/components/restaurantPage.vue');
const menu = () => import(/* webpackChunkName: "menu" */ '@/components/menuPage.vue');
const order = () => import(/* webpackChunkName: "order" */ '@/components/orderPage.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'login',
    component: loginPage,
  },
  {
    path: '/admin',
    component: adminPage,
    beforeEnter: (to, from, next) => {
      const info = get('user');
      if (info) {
        next();
      } else {
        Message({
          message: '请先登录',
          type: 'warning',
        });
        next('/login');
      }
    },
    children: [
      {
        path: '/',
        name: 'admin',
        redirect: 'restaurant',
      },
      {
        path: 'restaurant',
        name: 'restaurant',
        component: restaurant,
      },
      {
        path: 'menu',
        name: 'menu',
        component: menu,
      },
      {
        path: 'order',
        name: 'order',
        component: order,
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
