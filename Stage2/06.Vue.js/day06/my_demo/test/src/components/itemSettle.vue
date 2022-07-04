<template>
  <div class="item-box">
    <div class="item-name">{{ item.name }}</div>
    <div class="item-price">{{ item.price | currencyRMB}}</div>
    <div class="controller">
      <button class="sub" @click="sub()">-</button>
      <span class="count">{{ item.count }}</span>
      <button class="add" @click="add()">+</button>
    </div>
    <div class="discount" v-show='item.discount'>
        <slot ></slot>
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
    sub() {
      // console.log('111')
      this.$emit('sub', this.index);
    },
    add() {
      // console.log('222')
      this.$emit('add', this.index);
    },
  },
  filters: {
    currencyRMB(v) {
      return `¥${v.toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.item-box {
    padding: 5px 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  position: relative;
}
.item-name{
 font-size: 16px;
    font-weight: bold;
}
.sub,.add{
    width: 24px;
    height: 24px;

    padding: 3px 3px;
    border-radius: 12px;
    background-color: tomato;
}
.count{
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
}
.item-chart>.item-box:nth-of-type(odd){
    background-color: white;
}
.item-chart>.item-box:nth-of-type(even){
    background-color: yellow;
}
.discount{
    position: absolute;
    right: 0;
    top: 0;
}
</style>
