<template>
    <div>
        <slot name='header'></slot>
        <div>我是头</div>
        <div>我是尾巴</div>
        <slot name='footer'></slot>
    </div>
</template>

<script>
// ? 插槽是预设在组件内的一个位置，可以被填充
// ? <slot></slot>
// ? 如果是多个插槽，则需要通过命名来区分
    export default {
        
    }
</script>

<style scoped>

</style>