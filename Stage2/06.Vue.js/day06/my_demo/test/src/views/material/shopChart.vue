<template>
  <div class="item-chart">
    <itemSettle
      v-for="(item, index) in list"
      :item="item"
      :index="index"
      :key="index"
      @sub="sub"
      @add="add"
    >
    <img src="../../imgs/sale.png" alt="" width="34px">
    </itemSettle>

    <div class="total">总价格:{{ total | currencyRMB }}</div>
  </div>
</template>

<script>
import itemSettle from '../../components/itemSettle.vue';

export default {
  components: {
    itemSettle,
  },
  data() {
    return {
      list: [
        {
          name: '香蕉', price: 10, count: 1, discount: true,
        },
        {
          name: '苹果', price: 20, count: 1, discount: false,
        },
        {
          name: '榴莲', price: 30, count: 1, discount: true,
        },
        {
          name: '葡萄', price: 50, count: 1, discount: false,
        },
      ],
    };
  },
  methods: {
    sub(index) {
      if (this.list[index].count > 0) {
        this.list[index].count -= 1;
      } else {
        // eslint-disable-next-line no-alert
        alert('商品件数不能为负');
      }
    },
    add(index) {
      if (this.list[index].count < 9) {
        this.list[index].count += 1;
      } else {
        // eslint-disable-next-line no-alert
        alert('每人限购9件');
      }
    },
  },
  computed: {
    total() {
      let sum = 0;
      this.list.forEach((item) => {
        sum += item.price * item.count;
      });
      return sum;
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
.item-chart {
    background-color: rgb(235, 233, 233);
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 320px;
  /* background-color: aquamarine; */
  border: 2px solid tomato;
}
.total {
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: rgb(0, 0, 0);
  color: tomato;
  text-align: center;
  margin-top: 10px;
}
</style>
