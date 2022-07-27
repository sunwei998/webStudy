<template>
  <div
    ref="container"
    class="search-container"
  >
    <el-input
      v-model="val"
      placeholder="搜一下就啥都知道了"
      @input="search"
      @focus="changeStatus"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        class="search_button"
      />
    </el-input>
    <el-card

      v-show="isDisplay||isShow"
      class="box-card"
    >
      <div
        v-show="isShow"
      >
        <div
          v-for="item in list"
          :key="item._id"
          class="text item"
          @click="toDetail(item._id)"
        >
          {{ item.name }}
        </div>
      </div>

      <div
        v-show="isDisplay"
      >
        <div
          v-for="item in keywordList"
          :key="item.keyword"
          class="text item"
          @click="toWhere(item.keyword)"
        >
          {{ item.keyword }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// todo 联想查询
// ? input输入,请求查询结果
// ? 点击结果,查看具体信息
// ? 记录用户查询的关键字,用tag显示出来
// ? 按用户查询次数排序
// ? 点击tag,可以查询
import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import { searchContent } from '@/api/search';
import { set, get } from '@/common/util';

export default {
  data() {
    return {
      val: '',
      list: [],
      flag: false,
      keywords: get('keywords') || [],
    };
  },
  computed: {
    isShow() {
      return this.list.length > 0;
    },
    isDisplay() {
      return (!this.val) && this.flag;
    },
    // todo 降序排列
    keywordList() {
      return _.orderBy(this.keywords, ['count'], ['desc']);
    },
  },
  mounted() {
    // ? 浏览器监听
    document.addEventListener('click', this.hideEvt);
  },
  beforeDestroy() {
    // ? 清空监听事件
    document.removeEventListener('click', this.hideEvt);
  },
  methods: {
    // ? 发请求防抖
    // eslint-disable-next-line func-names
    search: _.debounce(async function () {
      if (this.val) {
        await this.getContent();
      } else {
        this.list = [];
      }
    }, 500),

    async getContent() {
      // ! 服务方式loading
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      try {
        const result = await searchContent({ keyword: this.val });
        // console.log('result: ', result);
        // console.log('keywords: ', this.keywords);
        this.list = result;
        // todo 记录下用户的关键字
        this.recordKeywords();
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        loading.close();
      }
    },

    // * 记录下用户的关键字
    // ? 目标数据结构:
    //  [
    //   {keyword:...,count:...},
    //   {keyword:...,count:...},
    //    ...
    //  ]
    recordKeywords() {
      // ? 先从localstorage中获取
      const list = get('keywords') || [];
      const num = _.findIndex(list, (item) => item.keyword === this.val);
      if (num > -1) {
        // ? 找到
        // ? 在原先基础上count+1
        list[num].count += 1;
      } else {
        // ? 没找到
        // ? 新建一个对象 keyword=this.val,count=0
        const data = {
          keyword: this.val,
          count: 0,
        };
        list.push(data);
      }
      set('keywords', list);
      // ? 同时更新data中的keywords
      this.keywords = list;
    },

    // ? 监听事件
    hideEvt(e) {
      if (this.$refs.container && !this.$refs.container.contains(e.target)) {
        this.changeState();
      }
    },
    changeStatus() {
      this.flag = true;
    },
    // ? 盒子失去焦点
    changeState() {
      this.list = '';
      this.flag = false;
    },
    async toWhere(v) {
      console.log(v);
      this.val = v;
      await this.getContent();
    },
    toDetail(v) {
      // ? 通过query传参
      this.$router.push(`/admin/detail?id=${v}`);
    },
  },

};
</script>

<style lang="scss" scoped>
.search-container {
  margin: auto;
  width: 666px;
}
::v-deep .el-card {
  height: 400px;
  overflow: scroll;
}

.item {
  cursor: pointer;
}
.text {
  font-size: 14px;
}
.item {
  padding: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.item:hover{
  background-color: rgb(230, 226, 226);
}
</style>
