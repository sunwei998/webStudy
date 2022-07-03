<template>
  <div class="undoBox">
    <div class="undoinput">
      <input
        type="checkbox"
        aria-label="true"
        :checked="item.checked"
        @click="changeStatus"
      />
    </div>
    <div class="name-content">
      {{ item.name }}
    </div>
    <div class="cancel-button" @click.stop="cancelTaskB()" aria-hidden="true">
      <img src="../imgs/cancel.png" alt="" width="16px" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    changeStatus() {
      this.$emit('changeStatus', this.item);
    },
    cancelTaskB() {
      console.log('in');
      this.$emit('cancelTaskB', this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.undoBox{
  // background-color: whitesmoke;
   display:flex;
    width:100%;
    height: 42px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    position: relative;
    box-sizing: border-box;
    color: red;
    font-weight: bold;
}
.cancel-button{
  visibility: hidden;
}
.undoBox:hover{
  background-color: rgb(221, 218, 218);
}
.undoBox:hover>.cancel-button{
  visibility: visible;
}
</style>
