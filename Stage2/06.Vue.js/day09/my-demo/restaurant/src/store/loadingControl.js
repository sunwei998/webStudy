export default {
  state: {
    loading: false,
  },
  getters: {
  },
  mutations: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
  actions: {
  },
};
