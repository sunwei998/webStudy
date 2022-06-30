<template>
    <div>
        <div>爷爷</div>
        <BB/>
    </div>
</template>

<script>
import BB from './BBView.vue'

// ? 通过特殊的注释，禁用eslint的检测
// ? 规则名字不写就代表所有规则
// ? eslint-disable-next-line xxxx（规则名字） 下一行
// ? eslint-disable xxxx （规则名字） 整个文件

export default {
    components:{
        BB
    },
    data(){
        return {
            a : 1
        }
    },
    // ? 本组件向外提供的对象数据
    provide(){
        return {
            a : this.a
        }
    }
}
</script>

<style scoped>

</style>