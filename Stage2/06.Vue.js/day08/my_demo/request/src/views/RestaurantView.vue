<template>
  <div>
    <div
      class="restaurant-label"
      v-for="restaurant in restaurants"
      :key="restaurant._id"
      @click='toMenu(restaurant._id)'
      aria-hidden
    >
      {{ restaurant.name["zh-CN"] }}
    </div>
    <div class="mask" v-if="loading">
      <img src="@/assets/loading.gif" alt="" width="30px" height="30px" />
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { getRestaurant } from '@/api/restaurant';

export default {
  data() {
    return {
      loading: false,
      restaurants: [],
    };
  },
  created() {
    this.loadRestaurant();
  },
  methods: {
    async loadRestaurant() {
      try {
        this.loading = true;
        const result = await getRestaurant();
        console.log('result: ', result);
        this.restaurants = result;
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
    toMenu(v) {
      // ? query
    //   this.$router.push({
    //     name: 'menu',
    //     query: {
    //       id: v,
    //     },
    //   });

      // ? params
      //   this.$router.push({
      //     name: 'menu',
      //     params: {
      //       id: v,
      //     },
      //   });
      // ? 设置好动态路由之后 /menu/:id
      this.$router.push(`/menu/${v}`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
