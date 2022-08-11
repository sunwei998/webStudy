<template>
  <div>
    <el-container>
      <el-header>
        <div class="userInfo">Welcome!</div>
        <div class="admin-title">Tasty <span>管理平台</span></div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="logo">
            <img src="@/assets/tasty.png" alt="" width="100px" height="100px" />
          </div>
          <el-menu
            :default-active="current"
            class="el-menu-vertical-demo"
            @select="to"
          >
            <el-menu-item index="restaurant">
              <i class="el-icon-tableware" />
              <span slot="title">餐馆</span>
            </el-menu-item>
            <el-menu-item index="menu">
              <i class="el-icon-fork-spoon" />
              <span slot="title">菜单</span>
            </el-menu-item>
            <el-menu-item index="order">
              <i class="el-icon-notebook-1" />
              <span slot="title">订单</span>
            </el-menu-item>
          </el-menu>
          <div class="refresh-button">
            <div>
              <el-button round type="success" @click="refresh">刷新</el-button>
            </div>
            <div>
              <el-button round @click="logout"> 登出 </el-button>
            </div>
          </div>
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
import { get, set } from '@/common/util';

export default {
  data() {
    return {
      // ? this.$route.name是自己定义的和menu的index对应上
      current: this.$route.name,
      role: get('user').role || null,
    };
  },
  methods: {
    to(v) {
      if (this.$route.path !== `/admin/${v}`) {
        this.$router.push(v);
        console.log('this.$route.name: ', this.$route.name);
      }
    },
    refresh() {
      // ? 刷新当前页面
      this.$router.go(0);
    },
    // ? 登出
    // ? 删除localstorage
    // ? 清空状态
    // ? 回到lgin页面
    logout() {
      set('user', null);
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: black;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  // font-size: 16px;
  font-weight: bold;
  // border-bottom: 1px solid rgb(225, 221, 221);
  position: relative;
  color: #be9f22;
}
.userInfo {
  position: absolute;
  left: 2%;
  width: fit-content;
  height: fit-content;
  letter-spacing: 1px;
  font-size: 17px;
  color: #409eff;
}
.admin-title {
  letter-spacing: 1px;
  font-size: 22px;
}
.admin-title span{
  letter-spacing: 4px;
}

.el-aside {
  // background-color: #545c64;
  height: calc(100vh - 60px);
  border-right: 1px solid rgb(225, 221, 221);
}

.el-main {
  height: calc(100vh - 60px);
}
::v-deep .el-menu-item span {
  font-weight: 500;
  // font-size: 16px;
}
::v-deep .el-aside {
  position: relative;
}
.refresh-button {
  width: fit-content;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  margin-top: 12vh;

}

::v-deep .refresh-button .el-button {
  padding: 8px 15px;
}

// ::v-deep .el-aside .el-button {
//   position: absolute;
//   bottom: 60px;
//   left: 50%;
//   transform: translateX(-50%);
//   // background-color: #a3bbd3;
//   padding: 12px 16px;
// }
.logo {
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}
::v-deep .el-menu-vertical-demo li {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 0px !important;
  padding-top: 15px;
  padding-bottom: 15px;
  height: fit-content !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
</style>
