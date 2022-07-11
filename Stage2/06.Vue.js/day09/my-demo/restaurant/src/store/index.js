import Vue from 'vue';
import Vuex from 'vuex';

// ? 模块
import loading from '@/store/loadingControl';
import modal from '@/store/modalPage';
import user from '@/store/user';
import restaurant from '@/store/restaurant';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loading,
    modal,
    user,
    restaurant,
  },
});
