
// ? 组件间传参 (兄弟传参)
// ? Vue中提供了一种方式,来组件间传参
// ? 学名 : 事件总线

// ? 事件总线，说白了就是一个新的Vue实例
// ? 用它不是为渲染，为了其中的一些方法
// ? 通过它来，触发事件/监听事件
const eventBus = new Vue();

const componentA = {
    template : `
        <div>
            <div>A</div>
            <button @click='test'>test</button>
            <div>A</div>
        </div>
    `,
    methods:{
        test(){
            eventBus.$emit('test',1234);   
        }
    }
}

const componentB = {
    template : `
        <div>
            <div>B</div>
            <div>{{ val }}</div>
        </div>
    `,
    data(){
        return {
            val : ''
        }
    },
    mounted(){
        eventBus.$on('test',(v)=>{
            this.val = v;
        })
    }
}

let vm = new Vue({
    el:'#app',
    components:{
        'component-a' : componentA,
        'component-b' : componentB
    },
    data(){
        return {
            
        }
    },
    mounted(){
        eventBus.$on('test',(v)=>{
            console.log('爹 ====>',v);
        })
    }
});