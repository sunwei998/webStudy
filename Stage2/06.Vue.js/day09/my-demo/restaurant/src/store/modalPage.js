export default {
  state: {
    modalShow: false,
    message: '',
  },
  getters: {
  },
  mutations: {
    showModal(state, { message }) {
      state.modalShow = true;
      state.message = message;
    },
    hideModal(state) {
      state.modalShow = false;
      state.message = '';
    },
  },
  actions: {
  },
};
