import { get, set } from '@/common/util';
import router from '@/router';

export default {
  state: {
    // ? 从localstorage中获取持久的user信息
    user: get('user') || {},
  },
  getters: {
  },
  mutations: {
    saveUser(state, { user }) {
      state.user = user;
    },
  },
  actions: {
    logout({ commit }) {
      commit('saveUser', { user: {} });
      set('user', null);
      router.push('/login');
    },
  },
};
