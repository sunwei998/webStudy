<template>
  <div class="table-container">
    <el-button
      type="primary"
      @click="addItemData"
    >
      添加<i class="el-icon-upload el-icon--right" />
    </el-button>
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div class="nameContainer">
        <div class="dia-title">
          商品名:
        </div>
        <input
          v-model="formData.name"
          class="inner-data"
        >
      </div>
      <div class="modifyContainer">
        <div class="dia-title">
          积分:
        </div>
        <div>
          <input
            v-model.number="formData.price"
            class="inner-data"
          >
        </div>
      </div>
      <div class="urlContainer">
        <div class="dia-title">
          图片URL:
        </div>
        <input
          v-model="formData.image"
          class="inner-data"
        >
      </div>
      <div class="image-viewer">
        <el-image
          v-show="formData.image"
          style="width : 40px; height : 40px"
          :src="formData.image"
        />
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
    <el-table
      v-loading="loading"
      style="width: 100%"
      :data="tableData"
    >
      <el-table-column
        prop="name"
        label="商品名"
      />
      <el-table-column
        label="图片"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.image"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="积分"
      />
      <el-table-column
        label="上架时间"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.createdAt|formatTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="operate(scope.row)"
          >
            操作
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="下架"
      >
        <!-- 绑定当前行数据的isDeleted -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDeleted"
            active-color="#13ce66"
            inactive-color="#ccc"
            @change="handleData(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <div
      v-show="isPageShow"
      class="pageDevorce"
    >
      <el-pagination
        background
        layout="prev, pager, next,total,sizes,jumper"
        :total="total"
        :page-size="limit"
        :current-page="current"
        :page-sizes="[7, 10, 15, 20]"
        @current-change="changePage"
        @size-change="changeSize"
      />
    </div>
  </div>
</template>

<script>
// ! 后端分页
// ? 每改变一次页码,就发送一次请求,获取当页的信息
// ? 常用,当数据量很大的时候,都是后端分页
// ? required的参数:page页数 & limit一页的条数
// eslint-disable-next-line import/no-cycle
import {
  getItemInfo, deleteItem, modifyItem, addItem,
} from '@/api/item';
import _ from 'lodash';

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      isPageShow: false,
      total: 0,
      limit: 7,
      current: 1,
      centerDialogVisible: false,
      formData: {},
      title: '',
    };
  },
  created() {
    this.loadItemInfo();
  },
  methods: {
    open1() {
      const h = this.$createElement;
      this.$notify({
        title: '修改成功',
        message: h('i', { style: 'color: teal' }, `商品名:${this.formData.name}积分:${this.formData.price}`),
      });
    },
    open2() {
      const h = this.$createElement;
      this.$notify({
        title: '添加成功',
        message: h('i', { style: 'color: teal' }, `商品名:${this.formData.name}积分:${this.formData.price}`),
      });
    },
    async loadItemInfo() {
      try {
        this.loading = true;
        const result = await getItemInfo({
          page: this.current,
          limit: this.limit,
        });
        console.log('result: ', result);
        this.tableData = result.list;
        this.total = result.total;
        this.isPageShow = true;
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    // ! 改变当前页码再发送请求
    async changePage(v) {
      try {
        this.loading = true;
        this.current = v;
        await this.loadItemInfo();
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    // ! 改变每页显示条数再发送请求
    async changeSize(v) {
      try {
        this.loading = true;
        this.limit = v;
        this.current = 1;
        await this.loadItemInfo();
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    // todo 点击操作按钮打开dialog框
    operate(v) {
      console.log('v: ', v);
      this.title = '编辑';
      this.formData = _.cloneDeep(v);
      this.centerDialogVisible = true;
    },
    // todo 点击添加打开添加商品的dialog框
    addItemData() {
      this.title = '添加';
      this.formData = {};
      this.centerDialogVisible = true;
    },
    // todo 点击确定按钮发送请求修改数据
    // ? 根据title的值取修改或者添加商品数据
    async control() {
      if (this.title === '编辑') {
        if (this.formData.name && this.formData.price && this.formData.image) {
        // todo 修改并获取最新数据
          try {
            this.loading = true;
            await modifyItem({
              data: _.pick(this.formData, ['name', 'price', '_id', 'image']),
            });
            this.open1();
            this.centerDialogVisible = false;
          } catch (error) {
            this.$message.error(error.message);
          } finally {
            await this.loadItemInfo();
            this.loading = false;
          }
        } else {
          this.$message({
            message: '请完善数据',
            type: 'warning',
          });
        }
      } else if (this.title === '添加') {
        this.loading = true;
        if (this.formData.name && this.formData.price && this.formData.image) {
          try {
            await addItem(this.formData);
            this.open2();
            this.centerDialogVisible = false;
          } catch (error) {
            this.$message.error(error.message);
          } finally {
            await this.loadItemInfo();
            this.loading = false;
          }
        } else {
          this.loading = false;
          this.$message({
            message: '请完善数据',
            type: 'warning',
          });
        }
      }
    },
    // * 下架/上架商品
    async handleData(v) {
      try {
        this.loading = true;
        await deleteItem({
          // eslint-disable-next-line no-underscore-dangle
          id: v._id,
          isDeleted: v.isDeleted,
        });
        if (v.isDeleted) {
          this.$message({
            message: '下架成功',
            type: 'success',
          });
        } else {
          this.$message({
            message: '上架成功',
            type: 'success',
          });
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        // ? 重新加载商品详情
        await this.loadItemInfo();
        this.loading = false;
      }
    },
  },

};
</script>

<style lang="scss" scoped>
::v-deep .cell .el-button{
    padding: 6px 8px;
}
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

.modifyContainer,.nameContainer,.urlContainer{
  margin:20px 0px;
  width:fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
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
::v-deep .el-dialog{
  width: fit-content;
  height: fit-content;
  border-radius: 8%;
  box-shadow: 10px 10px 10px #ccc;
}
.dia-title{
  width: 80px;
}
.image-viewer{
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
