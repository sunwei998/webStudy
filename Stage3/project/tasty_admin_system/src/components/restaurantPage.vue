<template>
  <div class="restaurantMain">
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      v-loading="dialogLoading"
    >
      <div>
        <el-input
          placeholder="餐馆名称"
          v-model="inputValue"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            @change="changeLang"
          >
            <el-option label="中文" value="1"></el-option>
            <el-option label="English" value="2"></el-option>
          </el-select>
        </el-input>

        <div class="tag-container">
          <el-select
            v-model="row.tags"
            multiple
            collapse-tags
            placeholder="请选择"
          >
            <el-option
              v-for="item in tagCollection"
              :key="item"
              :value="item"
              :label="item"
            >
            </el-option>
          </el-select>
          <div class="rowTags">
            <el-tag
              v-for="item in row.tags"
              :key="item"
              closable
              size="medium"
              @close="removeTags(item)"
              >{{ item }}</el-tag
            >
          </div>
        </div>
        <div class="newyorkTime">
          <el-card> 纽约时间:{{ newyorkTime }} </el-card>
        </div>
        <div class="timeOption restaurantTime" v-for="(item,index) in row.timeRange" :key="index">
          <!-- <div class="dayTitle" v-for="(item,index) in weeks" :key="index">{{item}}</div> -->
            <el-time-picker
              is-range
              v-model="row.timeRange[index]"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" round>取 消</el-button>
        <el-button type="primary" @click="confirm" round
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-table
      :data="restaurant.slice(limit * (current - 1), limit * current)"
      style="width: 100%"
      v-loading.fullscreen.lock="restaurantLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)"
    >
      <el-table-column prop="name.zh-CN" label="名称" width="200">
      </el-table-column>
      <el-table-column prop="address.formatted" label="地址" width="350">
      </el-table-column>
      <el-table-column label="标签" width="320">
        <template slot-scope="scope">
          <el-tag :key="tag" v-for="tag in scope.row.tags" type="">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button round @click="modify(scope.row)"
          :disabled="role!=='admin'"
            >编辑</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="关闭状态" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.closedJudgment"
            @change="switchStatus(scope.row)"
            :disabled="role!=='admin'"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="isPageShow" class="pageDevorce">
      <!-- total:总共多少条数据?
       page-size:每一页的数据条数
       current-page:当前页码
       页数是组件自动计算好的 -->
      <el-pagination
        background
        layout="prev, pager, next,total,sizes,jumper"
        :total="restaurant.length"
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
import { getResaurant } from '@/api/restaurant/getRestaurant';
import { getTags } from '@/api/restaurant/getTags';
import { changeClosed } from '@/api/restaurant/changeClosed';
import { updateRestaurant } from '@/api/restaurant/updateRestaurant';
import _ from 'lodash';
import moment from 'moment-timezone';
import { get } from '@/common/util';

export default {
  data() {
    return {
      isPageShow: false,
      restaurant: [],
      restaurantLoading: false,
      limit: 7,
      current: 1,
      dialogVisible: false,
      // ? 修改名称的输入框
      inputValue: '',
      // ? 语言
      select: '',
      // ? 打开dialog时深拷贝的一行数据
      row: {},
      // ? 所有tags
      tagCollection: [],
      // ? dialog框加载
      dialogLoading: false,
      // ? 纽约时间
      newyorkTime: moment()
        .locale('zh-cn')
        .tz('America/New_York')
        .format('YYYY-MM-DD HH:mm:ss dddd'),
      timer: null,
      role: get('user').role || null,
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    async getData() {
      try {
        this.restaurantLoading = true;
        const res = await getResaurant();
        this.restaurant = res;
        // ? 处理closed报错,添加一个属性
        this.restaurant.forEach((item) => {
          const timeArray = [];
          if (item.closed) {
            // eslint-disable-next-line no-param-reassign
            item.closedJudgment = true;
          } else {
            // eslint-disable-next-line no-param-reassign
            item.closedJudgment = false;
          }
          // ? 处理时间
          // ? 遍历每一家餐馆的hours
          // ? 将其中每一个数组中的对象的值转化为事时间对象存入数组
          item.hours.forEach((things) => {
            const startTime = moment().startOf('day').add(_.get(things, 'start', 0), 'minutes').toDate();
            const endTime = moment().startOf('day').add(_.get(things, 'end', 0), 'minutes').toDate();
            timeArray.push([startTime, endTime]);
          });
          // eslint-disable-next-line no-param-reassign
          item.timeRange = timeArray;
        });
        console.log('this.restaurant: ', this.restaurant);
        this.isPageShow = true;
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.restaurantLoading = false;
      }
    },
    changePage(v) {
      this.current = v;
    },
    changeSize(v) {
      this.limit = v;
    },
    // ? 点击编辑打开dialog
    async modify(v) {
      try {
        this.dialogVisible = true;
        this.dialogLoading = true;
        this.timeRunner();
        // ? 发送请求获取所有tags
        const res = await getTags();
        this.tagCollection = res;
        // ? 深拷贝,作为暂存状态
        // ? 当刚打开dialog框时,在input中渲染出该行的各项数据
        this.row = _.cloneDeep(v);
        if (this.select === '1' && v.name['zh-CN']) {
          this.inputValue = v.name['zh-CN'];
        } else if (this.select === '2' && v.name['en-US']) {
          this.inputValue = v.name['en-US'];
        } else {
          this.inputValue = '';
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.dialogLoading = false;
      }
    },
    changeLang() {
      // ? 名字存在并根据语言渲染在input中
      if (this.select === '1' && this.row.name['zh-CN']) {
        this.inputValue = this.row.name['zh-CN'];
      } else if (this.select === '2' && this.row.name['en-US']) {
        this.inputValue = this.row.name['en-US'];
      } else {
        this.inputValue = '';
      }
    },
    // ? 关闭提示框前的确认
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // ? 删除tags
    removeTags(v) {
      const index = this.row.tags.findIndex((item) => item === v);
      this.row.tags.splice(index, 1);
      // console.log(v);
    },
    // ! 什么情况??????????????
    // ? 关闭/打开餐馆
    async switchStatus(v) {
      try {
        this.restaurantLoading = true;
        let data = {};
        if (v.closedJudgment) {
          data = {
            closed: { closed: true },
          };
        } else {
          data = {
            closed: null,
          };
        }
        const requestBody = {
          data,
          // eslint-disable-next-line no-underscore-dangle
          id: v._id,
        };
        await changeClosed(requestBody);
        await this.getData();
        if (v.closedJudgment === true) {
          this.$message.success('关闭成功');
        } else {
          this.$message.success('打开成功');
        }
      } catch (error) {
        this.$message.error('修改失败');
      } finally {
        // ?  重新加载页面
        this.restaurantLoading = false;
      }
    },
    // ? 时间定时器
    timeRunner() {
      this.timer = setInterval(() => {
        this.newyorkTime = moment()
          .locale('zh-cn')
          .tz('America/New_York')
          .format('YYYY-MM-DD HH:mm:ss dddd');
      }, 1000);
    },
    async confirm() {
      try {
        this.dialogLoading = true;
        // ? 中英文名称
        const { name } = this.row;
        if (this.select === '1') {
          name['zh-CN'] = this.inputValue;
        } else if (this.select === '2') {
          name['en-US'] = this.inputValue;
        }
        // ? 标签数据
        const { tags } = this.row;
        //  ? 重构发送请求时时间数据
        const hours = [];
        this.row.timeRange.forEach((item, index) => {
          const startTime = item[0].getHours() * 60 + item[0].getMinutes();
          const endTime = item[1].getHours() * 60 + item[1].getMinutes();
          const organizeDate = {
            type: this.row.hours[index].type || 'delivery',
            dayOfWeek: index + 1,
            start: startTime,
            end: endTime,
          };
          hours.push(organizeDate);
        });
        const data = {
          hours,
          name,
          tags,
        };
        const requestBody = {
          data,
          // eslint-disable-next-line no-underscore-dangle
          id: this.row._id,
        };
        console.log('requestBody: ', requestBody);
        await updateRestaurant(requestBody);
        this.dialogVisible = false;
        await this.getData();
        this.$message.success('修改成功');
      } catch (error) {
        this.$message.error('修改失败');
      } finally {
        this.dialogLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.restaurantMain {
  position: relative;
  // padding-bottom: 50px;
}
.pageDevorce {
  width: fit-content;
  height: fit-content;
  position: absolute;
  left: 50%;
  margin-top: 50px;
  transform: translateX(-55%);
}
::v-deep .el-tag {
  margin: 2px;
}
::v-deep .cell .el-button {
  padding: 6px 8px;
  transform: translateX(-10px);
}
::v-deep .dialog-footer .el-button {
  padding: 8px 12px;
}
::v-deep .el-input--suffix > .el-input__inner {
  width: 120px !important;
}
::v-deep .tag-container .el-input--suffix .el-input__inner {
  width: 120px !important;
  height: 60px !important;
}
.tag-container {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 60px;
  overflow: scroll;
}
.rowTags {
  height: fit-content;
}
::v-deep .el-select__tags {
  transform: translateY(-30px);
  padding-left: 10px;
}
.timeOption{
  display: flex;
}
// .dayTitle{
//   font-size: 14px;
//   margin-right: 10px;
//   width: 40px !important;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
::v-deep .el-date-editor{
  width: 100% !important;
}
::v-deep .newyorkTime .el-card{
  height:fit-content
}
</style>
