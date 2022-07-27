<template>
  <div>
    <div>
      名字:{{ info.name }}
    </div>
    <div>
      时间:{{ info.createdAt|formatTime }}
    </div>
    <div>
      <el-image
        style="width: 100px; height: 100px"
        :src="info.image"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { getShopItem } from '@/api/search';

export default {
  data() {
    return {
      info: {},
    };
  },
  created() {
    // console.log(this.$route.query);
    this.loadShopItem();
  },
  methods: {
    async loadShopItem() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      try {
        const result = await getShopItem(this.$route.query.id);
        this.info = result.data;
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        loading.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
