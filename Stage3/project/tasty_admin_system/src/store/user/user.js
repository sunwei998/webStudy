import { get } from '@/common/util';

export default {
  state: {
    user: get('user') || {},
  },
  getters: {
  },
  mutations: {
    saveUser(state, v) {
      state.user = v;
    },
  },
  actions: {
  },
};
