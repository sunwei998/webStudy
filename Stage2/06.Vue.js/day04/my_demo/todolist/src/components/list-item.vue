<template>
    <div
      :class="['task-item', { status: item.checked }]"
      @click="changeStatus()"
    >
      <div class="flag_img" v-show="item.checked">
        <img src="../imgs/flag.png" alt="" width="32px" />
      </div>
      <div class="task-name">
        {{ item.name }}
      </div>
      <div class="cancel-button" @click.stop="cancelTask">
        <img src="../imgs/cancel.png" alt="" width="24px" />
      </div>
    </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object
        },
        index:{
            type:Number
        }
    },
    methods:{
        changeStatus(){
            this.$emit('changeStatus',this.item)
        },
        cancelTask(){
            this.$emit('cancelTask',this.index)
        }
    }
};
</script>

<style scoped>

.task-item{
    display:flex;
    width:100%;
    height: 42px;
    /* justify-content: center; */
    align-items: center;
    padding: 10px 10px;
    position: relative;
    box-sizing: border-box;
}
.flag_img{
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 50%;
}
.task-name{
    font-size: 14px;
    margin-left: 18px;
}
.cancel-button{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    right: 15px;
}

.task-item:nth-of-type(odd){
    background-color:bisque
}

.task-item:nth-of-type(even){
    background-color:rgb(223, 239, 239);
}
.container .status{
    background-color: pink;
    text-decoration: line-through;
}
</style>