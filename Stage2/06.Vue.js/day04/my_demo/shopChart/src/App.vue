<template>
  <div id="app">
    <shopCart></shopCart>
  </div>
</template>

<script>
import shopCart from './components/shopCart.vue'
export default {
  name: 'App',
  components: {
    shopCart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
