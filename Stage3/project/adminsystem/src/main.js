import Vue from 'vue';
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

// ? 全局过滤器
import '@/filters';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
