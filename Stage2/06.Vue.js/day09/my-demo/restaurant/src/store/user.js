import { userLogin } from '@/api/user/userLogin';
import { localSet, localGet } from '@/common/utlis';
import router from '@/router';

export default {
  state: {
    user: localGet('user') || {},
  },
  mutations: {
    saveUser(state, { user }) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        commit('showLoading');
        const result = await userLogin({ username, password });
        commit('saveUser', { user: result.user });
        localSet('user', result.user);
        router.push('/restaurant');
      } catch (error) {
        commit('showModal', { message: '登陆出错' });
      } finally {
        commit('hideLoading');
      }
    },
  },
};
