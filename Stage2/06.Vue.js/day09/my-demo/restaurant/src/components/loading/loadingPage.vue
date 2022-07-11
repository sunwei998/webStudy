<template>
  <div class="mask"
  v-show='loading'>
    <img src="@/assets/loading.gif" alt="" width="30px" height="30px" />
    <span>Loading...</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      loading: (state) => state.loading.loading,
    }),
  },
};
</script>

<style lang="scss" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
}
.mask span {
  margin-left: 10px;
}
</style>
