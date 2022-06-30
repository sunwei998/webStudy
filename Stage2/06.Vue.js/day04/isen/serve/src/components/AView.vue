<template>
    <div>
        这是A组件
        {{ taskItem.name }}
    </div>
</template>

<script>
    export default {
        props: {
            taskItem:{
                type : Object
            }
        }
    }
</script>

<style scoped>

</style>