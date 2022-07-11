<template>
  <div id="app">
    <modalPage/>
    <loadingPage/>
    <router-view/>
  </div>
</template>

<script>
// ? loading等待组件
import loadingPage from '@/components/loading/loadingPage.vue';

// ? 自制弹窗组件
import modalPage from '@/components/modal/modalPage.vue';

export default {
  components: {
    loadingPage, modalPage,
  },
};
</script>
ModalPage

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
