<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <!-- 作用域插槽 -->
      <div
        slot-scope="{ node, data }"
        class="custom-tree-node"
      >
        <div>{{ node.label }}</div>
        <div class="button-container">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="() => edit(data)"
          />
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            @click="() => add(data)"
          />
          <el-button
            type="primary"
            icon="el-icon-delete"
            circle
            @click="() => remove(node, data)"
          />
        </div>
      </div>
    </el-tree>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input
        v-model="dialogData.label"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import { nanoid } from 'nanoid';

export default {
  data() {
    const data = [{
      id: 1,
      label: 'mobile-Phone',
      children: [{
        id: 4,
        label: 'Apple',
        children: [{
          id: 9,
          label: 'iphone 11 Pro',
        }, {
          id: 10,
          label: 'iphone 13 Pro',
        }],
      }],
    }, {
      id: 2,
      label: 'Computer',
      children: [{
        id: 5,
        label: 'Macbook Pro',
      }, {
        id: 6,
        label: 'Alien',
      }],
    }, {
      id: 3,
      label: 'Car',
      children: [{
        id: 7,
        label: 'Porsche',
      }, {
        id: 8,
        label: 'Benz',
      }],
    }, {
      id: 11,
      label: 'SuperStar',
      children: [{
        id: 17,
        label: 'CR7',
      }, {
        id: 18,
        label: 'Messi',
      }],
    }];
    return {
      data: JSON.parse(JSON.stringify(data)),
      dialogVisible: false,
      // ? 模态框里的初始数据
      dialogData: {},
      // ? 浅拷贝数据,连接data与dialogData
      // ? 内存地址,状态位(选中的一行的数据),在任何时候修改selecte就是在修改data里的那一行数据
      changeData: {},
      title: '',
    };
  },
  methods: {
    edit(data) {
      this.title = '编辑';
      // ! 深拷贝的两种形式
      this.dialogData = _.cloneDeep(data);
      // this.dialogData = JSON.parse(JSON.stringify(data));
      this.dialogVisible = true;
      this.changeData = data;
    },
    add(data) {
      this.title = '添加';
      // ? 清空文本框
      this.dialogData = {};
      this.changeData = data;
      this.dialogVisible = true;
    },
    confirm() {
      if (this.title === '编辑') {
        // todo 修改名字
        this.changeData.label = this.dialogData.label;
        this.dialogVisible = false;
        this.title = '';
      } else if (this.title === '添加') {
        // todo 添加
        // ? 查找childre,如果有就push
        // ? 如果没有,就新建一个子节点
        if (this.changeData.children) {
          this.changeData.children.push({
            id: nanoid(),
            label: this.dialogData.label,
          });
        } else {
          // ! 响应式原理
          this.$set(this.changeData, 'children', [{
            id: nanoid(),
            label: this.dialogData.label,
          }]);
          // *该种方法数据会变化,但没有响应式
          // this.changeData.children = [{
          //   id: nanoid(),
          //   label: this.dialogData.label,
          // }];
        }
        this.dialogVisible = false;
        this.title = '';
      }
    },
    remove(node, data) {
      // ? 父节点
      const { parent } = node;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-node{
  display: flex;
}
::v-deep .el-tree-node__content{
  position: relative;
  width:300px;
  height: fit-content;
  margin-bottom: 10px;
  display: flex;
  // justify-content: center;
  align-content: center;
}
::v-deep .el-tree-node__content .el-button{
  padding: 6px;
  margin-left: 10%;
}
.button-container{
  position: absolute;
  right: 0;
}

::v-deep .dialog-footer .el-button{
  padding: 6px 10px;
  border-radius: 12px;
}
::v-deep .el-dialog__title{
font-size: 16px;
font-weight: bold;
}

::v-deep .el-input__inner{
  font-size: 12px;
  color: rgb(104, 103, 103);
}
::v-deep .el-dialog{
  border-radius: 5%;
}

::v-deep .dialog-footer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
