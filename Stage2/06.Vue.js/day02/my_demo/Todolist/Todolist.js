let vm = new Vue({
    el: "#app",
    data(){
        return {
            val : '',
            list:[
            ], 
        }
    },
    methods:{
        addTask(){
            if(this.val){
                this.list.push({
                    name : this.val,
                    checked : false
                })
                this.val = ''; 
            } 
        },
        cancelTask(index){
            console.log('index: ', index);
            this.list.splice(index,1)
        },
        changeStatus(index){
            this.list[index].checked=(this.list[index].checked===true)? false:true;
        }
    }
});