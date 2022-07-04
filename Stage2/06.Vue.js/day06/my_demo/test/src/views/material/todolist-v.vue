<template>
  <div class="fatBox">
    <div class="tdl_header">
      <listHeader @addTask="addTask"></listHeader>
    </div>
    <div class="sonBox">
      <div class="controller">
        <div class="first">
          <button @click="change('undo')"
          :class="['undoButton', { active: status === 'undo' }]"
          >
            未完成任务&nbsp;({{ undoNumber }})
          </button>
        </div>
        <div class="second">
          <button @click="change('done')"
          :class="['doneButton', { active: status === 'done' }]"
          >
            已完成任务&nbsp;({{ doneNumber }})
          </button>
        </div>
        <div class="third">
          <button @click="change('all')"
          :class="['allButton', { active: status === 'all' }]"
          >全部任务&nbsp;({{ total }})</button>
        </div>
      </div>
      <div class="itemPage">
        <UndoItems
          v-for="(item, index) in undoArray"
          :item="item"
          :index="index"
          :key="item.id + 1"
          @changeStatus="changeStatus"
          @cancelTaskB="cancelTaskB"
          v-show="status === 'undo'"
        ></UndoItems>
        <DoneItems
          v-for="(item, index) in doneArray"
          :item="item"
          :index="index"
          :key="item.id + 2"
          @changeStatus="changeStatus"
          @cancelTaskA="cancelTaskA"
          v-show="status === 'done'"
        ></DoneItems>
        <allItems
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item.id"
          @changeStatus="changeStatus"
          @cancelTask="cancelTask"
          v-show="status === 'all'"
        ></allItems>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import listHeader from '../../components/listHeader.vue';
import UndoItems from '../../components/UndoItems.vue';
import DoneItems from '../../components/DoneItems.vue';
import allItems from '../../components/all_Items.vue';

export default {
  name: 'ToDolist',
  components: {
    listHeader,
    UndoItems,
    DoneItems,
    allItems,
  },
  data() {
    return {
      status: 'all',
      list: [],
      undoArray: [],
      doneArray: [],
    };
  },
  methods: {
    judgeChecked() {
      const newdoneArray = this.list.filter((item) => item.checked);
      this.doneArray = newdoneArray;
      const newundoArray = this.list.filter((item) => !item.checked);
      this.undoArray = newundoArray;
    },
    addTask(val) {
      this.list.push({
        name: val,
        id: nanoid(),
        checked: false,
      });
      this.judgeChecked();
    },
    changeStatus(item) {
      // eslint-disable-next-line no-param-reassign
      item.checked = !item.checked;
      this.judgeChecked();
      console.log('item.checked: ', item.checked);
    },
    cancelTask(index) {
      this.list.splice(index, 1);
      this.judgeChecked();
    },
    cancelTaskA(index) {
      console.log('Ain');
      console.log('this.doneArray: ', this.doneArray);
      // this.doneArray.splice(index, 1);
      this.list.splice(this.list.findIndex((item) => item.id === this.doneArray[index].id), 1);
      this.judgeChecked();
    },
    cancelTaskB(index) {
      this.list.splice(this.list.findIndex((item) => item.id === this.undoArray[index].id), 1);
      this.judgeChecked();
    },
    change(v) {
      this.status = v;
    },
  },
  computed: {
    total() {
      return this.list.length;
    },
    undoNumber() {
      return this.undoArray.length;
    },
    doneNumber() {
      return this.doneArray.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.fatBox {
  width: 640px;
  height: 450px;
  margin: auto;
  // background-color: beige;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.sonBox {
  // background-color: aquamarine;
  width: 100%;
  height: 370px;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.controller{
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: fit-content;
  height: 100%;
  border-right: 1px solid #ccc;
  // background-color: pink;
  padding-left: 30px;
  padding-right: 30px;
}
.controller button{
  width: 120px;
  height: 36px;
  // height: fit-content;
  // padding: 5px 15px;
    color: white;
    background-color: rgb(48, 177, 232);
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 12px;
}
.itemPage{
  width: 100%;
  height: 100%;
  font-size: 14px;
  // background-color: greenyellow;
  overflow: scroll;
}
.controller .active{
  background-color: coral;
}
</style>
