<template>
  <div class="table-container">
    <el-dialog
      title="修改积分"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div class="modifyContainer">
        <button
          class="sub-button"
          @click="subNum"
        >
          sub
        </button>
        <input
          v-model.number="val"
          class="inner-data"
        >
        <button
          class="add-button"
          @click="addNum"
        >
          add
        </button>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="control"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 截取数组中的一部分 -->
    <el-table
      v-loading="loading"
      :data="tableData.slice(limit*(current-1),limit*current)"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="用户名"
      />
      <el-table-column
        prop="nickname"
        label="昵称"
      />
      <el-table-column
        label="性别"
      >
        <template slot-scope="scope">
          {{ scope.row.gender==1?'男':'女' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
      />
      <el-table-column
        prop="school"
        label="学校"
      />
      <el-table-column
        prop="integration"
        label="积分"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="operate(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="isPageShow"
      class="pageDevorce"
    >
      <!-- total:总共多少条数据?
       page-size:每一页的数据条数
       current-page:当前页码
       页数是组件自动计算好的 -->
      <el-pagination
        background
        layout="prev, pager, next,total,sizes,jumper"
        :total="tableData.length"
        :page-size="limit"
        :current-page="current"
        :page-sizes="[7, 10, 15, 20]"
        @current-change="changePage"
        @size-change="changeSize"
      />
      <!-- 前端分页 -->
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { getUserInfo, updateUser } from '@/api/user';
// todo 分页
// * 前段分页&后端分页
// * 从后端获取全部数据,然后通过改变页码/一页多少条进行分页
// * 常用于数据量不大的情况
// * 只在第一次发送请求,获取所有数据

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      isPageShow: false,
      // ! 一页多少条数据
      limit: 7,
      current: 1,
      centerDialogVisible: false,
      val: null,
      id: '',
    };
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      try {
        this.loading = true;
        const result = await getUserInfo();
        this.tableData = result;
        this.isPageShow = true;
      } catch (error) {
        this.$message.error(error.message);
        this.isPageShow = false;
      } finally {
        this.loading = false;
      }
    },
    operate(v) {
      console.log('积分: ', v.integration);
      this.val = v.integration;
      // eslint-disable-next-line no-underscore-dangle
      this.id = v._id;
      this.centerDialogVisible = true;
    },
    changePage(v) {
      this.current = v;
    },
    changeSize(v) {
      this.limit = v;
    },
    subNum() {
      this.val -= 1;
    },
    addNum() {
      this.val += 1;
    },
    async control() {
      if (this.val) {
        // todo 修改并获取最新数据
        try {
          this.loading = true;
          await updateUser({
            id: this.id,
            integration: this.val,
          });
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          await this.loadUserInfo();
          this.centerDialogVisible = false;
        } catch (error) {
          this.$message.error(error.message);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container{
  position: relative;
  padding-bottom: 50px;
}
::v-deep .el-table{
  margin-bottom: 30px;
}
.pageDevorce{
  width: fit-content;
  height: fit-content;
  position: absolute;
  left: 50%;
  // bottom: -50px;
  // bottom: -50px;
  transform: translateX(-55%);
}
.modifyContainer{
  margin: auto;
  width:fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-data{
  padding: 7px 10px;
  border: 1px solid;
  outline: none;
}
::v-deep .el-button--primary{
  padding: 6px 10px;
  border-radius: 8px;
}
.sub-button{
  padding: 7px 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid;
  background-color: rgb(224, 121, 84);
}
.add-button{
  padding: 7px 10px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid;
  background-color: rgb(224, 121, 84);
}
</style>
