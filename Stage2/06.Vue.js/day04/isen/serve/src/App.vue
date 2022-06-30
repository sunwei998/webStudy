<template>
  <div id="app">
      <!-- <A :taskItem="obj"/> -->
      <!-- <TodoList/> -->
      <!-- <TodoList/>
      <TodoList/> -->
      <!-- <B/> -->

      <Demo/>
  </div>
</template>

<script>
// ? 引入组件
// import A from './components/AView.vue';
// import TodoList from './components/TodoList.vue';
// import B from './components/BView.vue'
import Demo from './components/插槽.vue'

export default {
  name: 'App',
  components:{
    // A
    // TodoList,
    // B,
    Demo
  },
  data(){
    return {
      obj :{
         name : 'task1'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
