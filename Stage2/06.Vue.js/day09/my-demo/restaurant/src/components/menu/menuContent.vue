<template>
    <div>
{{item.name['zh-CN']}}
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
};
</script>

<style lang="scss" scoped>

</style>
