<template>
  <div class="inputBox">
    <div class="title">
      <h2>To Do List</h2>
    </div>

    <div class="creatButton">
      <input
      class="add-input"
      v-model.trim="val"
      placeholder="任务名"
      @keyup.enter="addTask"
      />
      <button class="add-btn" @click="addTask">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listHeader',
  data() {
    return {
      val: '',
    };
  },
  methods: {
    addTask() {
      if (this.val) {
        this.$emit('addTask', this.val);
        this.val = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.inputBox{
    width: 100%;
    background-color: plum;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.add-input{
    width: 260px;
    padding: 5px 10px;
    background: rgba(249, 247, 247, 0.2);
    outline: none;
    border: none;
    // border-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 12px;
    letter-spacing: 1px;
    color: rgb(44, 43, 43);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.creatButton{
    margin-top: 10px;
}
.add-btn{
    padding: 5px 15px;
    color: white;
    background-color: rgb(48, 177, 232);
    // border-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: none;
    cursor: pointer;
}
input::placeholder{
    color: white;
}
</style>
