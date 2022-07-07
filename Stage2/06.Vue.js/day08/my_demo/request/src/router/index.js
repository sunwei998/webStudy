import Vue from 'vue';
import VueRouter from 'vue-router';

const login = () => import(/* webpackChunkName: "login" */ '@/views/login.vue');
const restaurant = () => import(/* webpackChunkName: "restaurant" */ '@/views/RestaurantView.vue');
const menu = () => import(/* webpackChunkName: "menu" */ '@/views/MenuView.vue');
const page404 = () => import(/* webpackChunkName: "404" */ '@/views/Page404.vue');
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'loginPage',
    component: login,
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    component: restaurant,
    // ? 进入restaurant页面之前,从localStorage中找user
    beforeEnter: (to, from, next) => {
      // ? 从localstorage找user
      const user = localStorage.getItem('user');
      if (user) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/menu/:id',
    name: 'menu',
    component: menu,
    // ? 进入restaurant页面之前,从localStorage中找user
    beforeEnter: (to, from, next) => {
      // ? 从localstorage找user
      const user = localStorage.getItem('user');
      if (user) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/*',
    name: '404',
    component: page404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
