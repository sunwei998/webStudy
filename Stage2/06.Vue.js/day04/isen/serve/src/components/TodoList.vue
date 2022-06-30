<template>
    <div>
        <TodoHeader @addTask='addTask'/>
        <div>一共{{ total }}任务</div>
        <div>已完成{{ checkedCount }}任务</div>
        <div>没完成{{ unCheckedCount }}任务</div>

        <TaskItem v-for='(task,index) in list' :task='task' :key='task.id'
            :index='index'
            @check='check'
            @remove='remove'
        ></TaskItem>
    </div>
</template>

<script>
import { nanoid } from 'nanoid'
// ? 组件
import TodoHeader from './TodoHeader.vue';
import TaskItem from './TaskItem.vue';

export default {
    components: {
        TodoHeader,
        TaskItem
    },
    data(){
        return {
            list : []
        }
    },
    methods:{
        addTask(val){
            this.list.push({
                name : val,
                checked : false,
                id : nanoid() 
            })
        },
        check(task){
            task.checked = !task.checked;
        },
        remove(index){
            console.log('index: ', index);
            this.list.splice(index, 1);
        }
    },
    computed:{
        total(){
            return this.list.length;
        },
        checkedCount(){
            let array = this.list.filter((item)=>{
                return item.checked === true; 
            })
            
            return array.length;
        },
        unCheckedCount(){
            let array = this.list.filter((item)=>{
                return !item.checked; 
            })
            return array.length;
        }
    }
}
</script>

<style scoped>

</style>