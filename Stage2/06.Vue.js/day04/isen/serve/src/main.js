// ? main.js 项目的入口文件

import Vue from 'vue'
// ? 引入了 App.vue， 整个项目最大的组件
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// ? 打包好的js，会自动放到 public文件夹下的index.html中去


