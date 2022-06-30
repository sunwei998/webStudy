<template>
    <div>
        <div>我是爹</div>

        <BBB/>
    </div>
</template>

<script>
import BBB from './BBBView.vue'
    export default {
        components: {
            BBB
        },
        // ? 就近原则
        provide(){
            return {
                a : 3
            }
        }
    }
</script>

<style scoped>

</style>