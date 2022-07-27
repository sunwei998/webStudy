<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-date-picker
          v-model="time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="getDate"
        />
      </el-col>
    </el-row>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card v-loading="loading">
            <div
              ref="pieChart"
              class="pie-chart"
            />
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card v-loading="loading">
            <div
              ref="main"
              class="line-chart"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import { getChartData } from '@/api/chart';

const moment = extendMoment(Moment);

export default {
  data() {
    return {
      loading: false,
      // ? 默认时间为最近两周
      time: [moment().subtract(9, 'days'), moment().toDate()],
      // ? 准备好一个空,当中介,让每一个能获取this的地方,都能拿到echart实例
      barChart: null,
      pieChart: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近50天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 50);
            picker.$emit('pick', [start, end]);
          },
        }],
      },
    };
  },
  // ? 在真实DOM上渲染,在mounte之后执行
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.barChart = echarts.init(this.$refs.main);
    this.pieChart = echarts.init(this.$refs.pieChart);
    this.getDate();
  },
  beforeDestroy() {
    // ? 销毁真实dom,多了会影响性能
    this.barChart.dispose();
    this.pieChart.dispose();
  },
  methods: {
    async getDate() {
      try {
        this.loading = true;
        // ? 先转化成时间对象,再ISOstring
        const feedBack = await getChartData({
          start: new Date(this.time[0]).toISOString(),
          end: new Date(this.time[1]).toISOString(),
        });
        // ? 一般而言,后端所给的数据是不够用的
        // ? 所以,我们需要数据重构
        const lineOption = this.organizelineData(feedBack);
        const pieOption = this.organizePieData(feedBack);
        this.barChart.setOption(lineOption);
        this.pieChart.setOption(pieOption);
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    organizelineData(data) {
      // todo 每天多少单
      // ? 统一天数颗粒度,变成天,重构数据
      let newDate = _.map(data, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.time = moment(item.createdAt).format('YYYY-MM-DD');
        return item;
      });
      // ? 一天多少单
      newDate = _.groupBy(newDate, 'time');
      console.log('newDate: ', newDate);
      const dateRange = moment.range(new Date(this.time[0]), new Date(this.time[1]));
      console.log('dateRange: ', dateRange);
      let days = Array.from(dateRange.by('day'));
      days = days.map((m) => m.format('YYYY-MM-DD'));
      console.log('days: ', days);

      // ? 构建serie数据
      const count = days.map((day) => {
        // ? 如果存在,代表有单
        if (newDate[day]) {
          return newDate[day].length;
        }
        return 0;
      });
      console.log('count: ', count);
      const option = {
        xAxis: {
          type: 'category',
          // ? 替换掉自定义x轴
          data: days,
        },
        tooltip: {
          trigger: 'item',
          formatter: '时间:{b0} 单量:{c0}',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: count,
            type: 'line',
          },
        ],
      };
      console.log('option: ', option);
      return option;
    },
    organizePieData(data) {
      // todo 每天多少单
      // ? 统一天数颗粒度,变成天,重构数据
      let newDate = _.map(data, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.time = moment(item.createdAt).format('YYYY-MM-DD');
        return item;
      });
      // ? 一天多少单
      newDate = _.groupBy(newDate, 'time');
      console.log('newDate: ', newDate);
      const result = _.map(newDate, (item, index) => ({
        value: item.length,
        name: index,
      }));
      const option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: result,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      return option;
    },

  },

};
</script>

<style lang="scss" scoped>
.line-chart,.pie-chart{
  width: 580px;
  height: 280px;
}
.container{
  margin-top: 20px;
}
::v-deep .el-date-editor{
  width: 100%;
}
</style>
