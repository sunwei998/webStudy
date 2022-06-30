<template>
    <div :class="['task-item',{ checked : task.checked }]" @click='check'>
        <div>
            {{ task.name }}
        </div>
        <div @click.stop='remove'>
            x
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            task : {
                type : Object
            },
            index : {
                type : Number
            }
        },
        methods:{
            check(){
                this.$emit('check',this.task);
            },
            remove(){
                this.$emit('remove',this.index);
            }
        }
    }
</script>

<style>
    .task-item{
        width:200px;
        height:30px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    .checked{
        background-color:red
    }
</style>