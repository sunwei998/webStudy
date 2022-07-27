<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card v-loading="loading">
          <div
            ref="main"
            class="line-chart"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949"
    />
    <van-field
      v-model="sms"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
    >
      <template #button>
        <van-button
          size="small"
          type="primary"
        >
          发送验证码
        </van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import _ from 'lodash';

export default {
  data() {
    return {
      sms: '1234',
      loading: false,
      value: true,
      oldData: [{ label: '时间', dataList: ['2020', '2020', '2020', '2021', '2021', '2021', '2022', '2022', '2022'] }, {
        label: '套餐类型',
        dataList: ['套餐1', '套餐2', '套餐3',
          '套餐1', '套餐2', '套餐3', '套餐1', '套餐2', '套餐3'],
      }, { label: '收费金额', dataList: ['27.1', '45', '87', '47', '89', '125', '63.3', '145', '287'] }],
    };
  },
  mounted() {
    this.barChart = echarts.init(this.$refs.main);
    console.log('this.barChart: ', this.barChart);
    const result = _.map(this.oldData, (item) => item.label);
    console.log('result: ', result);
  },
};
</script>
<style lang='scss' scoped>
 .el-col {
    border-radius: 4px;
  }
  .line-chart{
    width: 400px;
    height: 300px;
  }
</style>
