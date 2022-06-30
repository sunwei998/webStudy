<template>
    <div>
        <input type="text" v-model='val' @keyup.enter="addTask">
        <button @click='addTask'>add</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                val : ''
            }
        },
        methods:{
            addTask(){
                if(this.val){
                    this.$emit('addTask',this.val)
                    this.val = '';
                }
            }
        }
    }
</script>

<style scoped>

</style>