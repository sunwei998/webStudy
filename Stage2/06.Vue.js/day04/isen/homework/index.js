const header = {
    template : `
        <div>
            <input v-model='val' @keyup.13='addTask'><button @click='addTask'>add</button>
        </div>
    `,
    data(){
        return {
            val : ''
        }
    },
    methods:{
        addTask(){
            if(this.val){
                this.$emit('add-task',this.val);
                this.val = '';
            }
        }
    }
}

const listItem = {
    template : `
        <div :class="['list-item',{ checked : item.checked }]" @click='check'>
            <div>{{ item.name }}</div>
            <div @click='remove'>x</div>
        </div>
    `,
    props : {
        item :{
            type : Object
        },
        index : {
            type : Number
        }
    },
    methods:{
        check(){
           this.$emit('check',this.item) 
        },
        remove(){
            this.$emit('remove',this.index)
        }
    }
    
    
}

let vm = new Vue({
    el:'#app',
    components:{
        headera: header,
        'list-item': listItem
    },
    data(){
        return {
            list : []
        }
    },
    methods:{
        addTaskHandler(val){
            this.list.push({
                name : val,
                id : Math.random(),
                checked: false
            })
        },
        check(item){
            item.checked = !item.checked;
        },
        remove(index){
            this.list.splice(index,1)
        }
    }
});