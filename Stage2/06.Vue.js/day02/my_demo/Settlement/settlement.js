let vm = new Vue({
    el: "#app",
    data() {
        return {
            list: [
                { name: '香蕉', price: 10, count: 1 },
                { name: '苹果', price: 20, count: 1 },
                { name: '榴莲', price: 30, count: 1 },
                { name: '葡萄', price: 50, count: 1 },
            ]
        }
    },
    computed: {
        total() {
            let sum = 0;
            this.list.forEach((item) => {
                sum += item.price * item.count
            })
            return sum;
        }
    },
    methods: {
        add(index) {
            if (this.list[index].count < 4) {
                this.list[index].count++;
            } else {
                alert('不能超过4个')
            }
        },
        sub(index) {
            if (this.list[index].count > 1) {
                this.list[index].count--;
            } else {
                alert('不能少于1个')
            }
        },
    },
    filters: {
        currencyRMB(v) {
            return `¥${v.toFixed(2)}`
        }
    }
});