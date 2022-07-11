<template>
  <div>
      <menuCpn
      v-for="item in foods"
       :key="item._id"
       :item="item"
      >
      </menuCpn>

  </div>
</template>

<script>
import menuCpn from '@/components/menu/menuContent.vue';
import { menuRequest } from '@/api/restaurant/menuRequest';
import { mapMutations } from 'vuex';

export default {
  components: {
    menuCpn,
  },
  data() {
    return {
      foods: [],
    };
  },
  created() {
    this.menuDisplay();
  },
  methods: {
    ...mapMutations(['showLoading', 'hideLoading', 'showModal']),
    async menuDisplay() {
      try {
        this.showLoading();
        const { id } = this.$route.params;
        const result = await menuRequest(id);
        this.foods = result.foods;
      } catch (error) {
        this.showModal({ message: '加载菜单失败' });
      } finally {
        this.hideLoading();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
