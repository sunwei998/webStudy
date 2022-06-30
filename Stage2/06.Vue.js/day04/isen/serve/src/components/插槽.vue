<template>
    <div>
        <Main>
            <template v-slot:header>
                <div>
                    <div>
                        slot header
                    </div>
                </div>
            </template>

            <template v-slot:footer>
                <div>
                    <div >
                        slot footer
                    </div>
                </div>
            </template>
        </Main>

        <InputView>
            <template v-slot:icon>
                <div class='icon'></div>
            </template>
        </InputView>
    </div>
</template>

<script>
import Main from './MainView.vue';
import InputView from './InputView.vue';
// ? 组件标签内的内容，就是填充进插槽的内容

export default {
    // ? 组件名
    name:'SlotView',
    components:{
        Main,
        InputView
    }
}
</script>

<style >
    .icon{
        width:20px;
        height:20px;
        background-color: red;
    }
</style>