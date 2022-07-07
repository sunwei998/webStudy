<template>
  <div>
    <div class="restaurant-content" v-for="food in foods" :key="food._id">
      {{ food.name["zh-CN"] }}
    </div>
    <div class="mask" v-if="loading">
      <img src="@/assets/loading.gif" alt="" width="30px" height="30px" />
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { getMenu } from '@/api/menu';

export default {
  data() {
    return {
      loading: false,
      foods: [],
    };
  },
  created() {
    this.loadMenu();
  },
  methods: {
    async loadMenu() {
      // ? 通过query
      //   console.log(this.$route.query);
      // ? 通过params / 动态路由
      //   console.log(this.$route.params);
      try {
        this.loading = true;
        const { id } = this.$route.params;
        console.log('this.$route.params: ', this.$route.params);
        const result = await getMenu(id);
        this.foods = result.foods;
      } catch (error) {
        console.log('error: ', error);
        // eslint-disable-next-line no-alert
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
