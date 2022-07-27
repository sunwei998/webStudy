<template>
  <div>
    <el-container>
      <el-header>
        <div class="userInfo">
          Welcome {{ user }}!
        </div>
        <div class="admin-title">
          管理平台
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="current"
            class="el-menu-vertical-demo"
            @select="to"
          >
            <el-menu-item index="user">
              <i class="el-icon-user" />
              <span slot="title">用户</span>
            </el-menu-item>
            <el-menu-item index="item">
              <i class="el-icon-shopping-cart-full" />
              <span slot="title">产品</span>
            </el-menu-item>
            <el-menu-item index="search">
              <i class="el-icon-search" />
              <span slot="title">搜索</span>
            </el-menu-item>
            <el-menu-item index="tree">
              <i class="el-icon-s-promotion" />
              <span slot="title">tree控件</span>
            </el-menu-item>
            <el-menu-item index="lazy">
              <i class="el-icon-picture" />
              <span slot="title">懒加载</span>
            </el-menu-item>
            <el-menu-item index="chart">
              <i class="el-icon-s-claim" />
              <span slot="title">统计</span>
            </el-menu-item>
            <el-menu-item index="test">
              <i class="el-icon-s-tools" />
              <span slot="title">测试</span>
            </el-menu-item>
          </el-menu>
          <el-button
            @click="logout"
          >
            登出
          </el-button>
        </el-aside>
        <el-main>
          <!-- 二级路由入口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // ? this.$route.name是自己定义的和menu的index对应上
      current: this.$route.name,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user.username,
    }),
  },
  methods: {
    to(v) {
      if (this.$route.path !== `/admin/${v}`) {
        this.$router.push(v);
        // console.log('v: ', v);
      }
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },

};
</script>

<style lang="scss" scoped>
.el-header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    // font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid rgb(225, 221, 221);
    position: relative;
  }
  .userInfo{
    position: absolute;
    left: 2%;
    width: fit-content;
    height: fit-content;
    letter-spacing: 1px;
    font-size:17px;
    color: #409EFF;
  }
  .admin-title{
    letter-spacing: 7px;
    font-size: 18px;
  }

  .el-aside {
    height: calc(100vh - 60px);
    border-right: 1px solid rgb(225, 221, 221);
  }

  .el-main {
    height: calc(100vh - 60px);
  }
  ::v-deep .el-aside{
    position: relative;
  }

  ::v-deep .el-aside .el-button{
    position: absolute;
    bottom: 30px;
    left:50%;
    transform: translateX(-50%);
  }
</style>
