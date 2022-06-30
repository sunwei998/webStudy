<template>
    <div>
        <div>儿子</div>
        <div> a : {{ a }}</div>
    </div>
</template>

<script>
// ! provide/inject是没有响应式的，这是vue框架有意为之的，
    export default {
        // ? 注入,祖先的provide的属性
        inject:['a']
    }
</script>

<style scoped>

</style>