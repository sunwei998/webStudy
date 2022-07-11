<template>
  <div class="modal-container"
  v-show="modalShow">
    <div class="remind-container">
        <div></div>
      <div>{{message}}</div>
      <div>
        <button class="confirm-button" @click="hideRefresh">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      modalShow: (state) => state.modal.modalShow,
      message: (state) => state.modal.message,
    }),
  },
  methods: {
    ...mapMutations(['hideModal']),
    hideRefresh() {
      this.hideModal();
    },
  },
};
</script>

<style lang="scss">
.modal-container {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.remind-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  width: 400px;
  height: 260px;
  border-radius:16px;
  border: none;
  padding: 10px;
  background: linear-gradient(to bottom, #f1f4f9, #c1def4, rgb(238, 196, 203));
  font-size: 14px;
  font-weight: bold;
}
.confirm-button{
    padding: 5px 15px;
    letter-spacing: 3px;
    border: 1px solid #ccc;
    color: white;
    background-color: coral;
    border-radius: 6px;
}
</style>
