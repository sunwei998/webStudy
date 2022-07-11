<template>
  <div>
    <restaurantIn
    class="restaurant-box"
    v-for='item in restaurant'
     :key="item._id"
     :item='item'
     @toMenu='toMenu'
    />
  </div>
</template>

<script>
import restaurantIn from '@/components/restaurant/restaurantContent.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    restaurantIn,
  },
  computed: {
    ...mapState({
      restaurant: (state) => state.restaurant.restaurant,
    }),
  },
  created() {
    this.getRestaurant();
  },
  methods: {
    ...mapActions(['getRestaurant']),
    toMenu(v) {
      console.log('in');
      // eslint-disable-next-line no-underscore-dangle
      this.$router.push(`/menu/${v._id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
