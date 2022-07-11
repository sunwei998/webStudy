import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const login = () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue');
const restaurant = () => import(/* webpackChunkName: "restaurant" */ '@/views/RestaurantView.vue');
const menu = () => import(/* webpackChunkName: "menu" */ '@/views/MenuView.vue');
const page404 = () => import(/* webpackChunkName: "page404" */ '@/views/Page404.vue');
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
    name: 'restaurantPage',
    component: restaurant,
  },
  {
    path: '/menu/:id',
    name: 'memuPage',
    component: menu,
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
