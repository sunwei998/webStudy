<template>
  <div class="menuMain">
    <div class="headerSearch">
      <el-select v-model="value" placeholder="请选择" @change="toMenu">
        <el-option
          v-for="item in restaurantOptions"
          :key="item._id"
          :label="item.name['zh-CN']"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-button"
        @keyup.enter.native="searchItem"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          :disabled="control"
          @click="searchItem"
        ></el-button>
      </el-input>
    </div>

    <el-table
      v-loading.fullscreen.lock="menuLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)"
      style="width: 100%"
      :data="menuData"
    >
      <el-table-column prop="name.zh-CN" label="商品名" width="500px" />
      <el-table-column label="价格" width="400px">
        <template slot-scope="scope">
          {{ scope.row.price | formatPrice }}
        </template>
      </el-table-column>
      <el-table-column label="下架" width="300px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.available"
            active-color="#13ce66"
            inactive-color="#ccc"
            @change="handleData(scope.row)"
            :disabled="role !== 'admin'"
          />
        </template>
      </el-table-column>
    </el-table>

    <div v-show="isPageShow" class="pageDevorce">
      <el-pagination
        background
        layout="prev, pager, next,total,sizes,jumper"
        :total="total"
        :page-size="limit"
        :current-page="current"
        :page-sizes="[7, 10, 15]"
        @current-change="changePage"
        @size-change="changeSize"
      />
    </div>
  </div>
</template>

<script>
import { getResaurant } from '@/api/restaurant/getRestaurant';
import { menuRequest } from '@/api/menu/getMenu';
import { get } from '@/common/util';
import _ from 'lodash';
import { updateAva } from '@/api/menu/updateAva';

export default {
  data() {
    return {
      restaurantOptions: [],
      value: '',
      current: 1,
      limit: 10,
      total: null,
      keyword: '',
      menuData: [],
      isPageShow: false,
      menuLoading: false,
      role: get('user').role || null,
    };
  },
  created() {
    this.getData();
  },
  // ? 控制检索按钮
  computed: {
    control() {
      if (this.value !== '' && this.keyword !== '') {
        return false;
      }
      return true;
    },
  },
  methods: {
    async getData() {
      try {
        this.menuLoading = true;
        const res = await getResaurant();
        this.restaurantOptions = res;
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.menuLoading = false;
      }
    },
    async toMenu() {
      try {
        this.menuLoading = true;
        const res = await menuRequest({
          id: this.value,
          page: this.current,
          limit: this.limit,
          keyword: this.keyword,
        });
        this.menuData = res.list;
        this.total = res.count;
        this.isPageShow = true;
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.menuLoading = false;
      }
      console.log('this.menuData: ', this.menuData);
    },
    async changePage(v) {
      console.log('v: ', v);
      try {
        this.menuLoading = true;
        this.current = v;
        await this.toMenu();
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.menuLoading = false;
      }
    },
    async changeSize(v) {
      try {
        this.loading = true;
        this.limit = v;
        this.current = 1;
        await this.toMenu();
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.menuLoading = false;
      }
    },
    // ? 关键字查询
    async searchItem() {
      await this.toMenu();
    },
    // ? 修改菜品状态
    async handleData(v) {
      try {
        this.menuLoading = true;
        const requestBody = {
        // eslint-disable-next-line no-underscore-dangle
          id: v._id,
          data: {
            ..._.omit(v, '_id'),
          },
        };
        await updateAva(requestBody);
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        await this.toMenu();
        this.menuLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menuMain {
  padding-bottom: 50px;
}
.pageDevorce {
  width: fit-content;
  height: fit-content;
  position: absolute;
  left: 50%;
  margin-top: 50px;
  transform: translateX(-40%);
}
.headerSearch {
  width: 100%;
  display: flex;
}
.input-with-button {
  width: 240px;
}
</style>
