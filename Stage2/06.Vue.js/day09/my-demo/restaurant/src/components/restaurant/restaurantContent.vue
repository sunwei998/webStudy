<template>
  <div
  @click='toMenu()'
  aria-hidden="true">
    {{ item.name["zh-CN"] }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    toMenu() {
      this.$emit('toMenu', this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
