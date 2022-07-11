import { restaurantRequest } from '@/api/restaurant/restaurantRequest';
// import router from '@/router';

export default {
  state: {
    restaurant: [],
  },
  mutations: {
    saveRestaurant(state, arr) {
      state.restaurant = arr;
    },
  },
  actions: {
    async getRestaurant({ commit }) {
      try {
        commit('showLoading');
        const result = await restaurantRequest();
        commit('saveRestaurant', result);
      } catch (error) {
        commit('showModal', { message: '进入餐馆失败' });
      } finally {
        commit('hideLoading');
      }
    },
  },
};
