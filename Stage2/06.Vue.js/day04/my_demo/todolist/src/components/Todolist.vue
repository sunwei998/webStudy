<template>
  <div class="containerBox">
    <listHeader @addTask="addTask"> </listHeader>
    <div class="container">
      <listItem v-for="(item,index) in list" 
      :item="item" 
      :index='index'
      :key="item.id" 
      @changeStatus='changeStatus'
      @cancelTask='cancelTask'></listItem>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import listHeader from "./list-header.vue";
import listItem from "./list-item.vue";
export default {
  name: "App",
  components: {
    listHeader,
    listItem,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    addTask(val) {
      this.list.push({
        name: val,
        id: nanoid(),
        checked: false,
      });
      // console.log('this.list: ', this.list);
    },
    changeStatus(item){
        item.checked=!item.checked
    },
    cancelTask(index){
        this.list.splice(index,1)

    }
  },
};
</script>

<style scoped>
.containerBox {
  /* position: relative; */
  width: 400px;
  min-height: 600px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* justify-content: center;
    align-items: center; */
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 0 0px 50px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: linear 0.6s;
  margin: auto;
  margin-top: 30px;
}
.containerBox:hover {
  transform: scale(1.01);
}
.container {
  width: 100%px;
  height: 520px;
  overflow: hidden;
}
</style>