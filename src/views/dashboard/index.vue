<script>
import Vue from 'vue'
import VCharts from 'v-charts'
Vue.use(VCharts)
export default {
  name: 'AdminDashboard',
  data() {
    return {
      histogramChartData: {
        columns: [
          '季度',
          '贫困户数量',
          '低保户数量',
          '特困户数量',
          '军烈户数量'
        ],
        rows: [
          {
            季度: '第一季度',
            贫困户数量: 320,
            低保户数量: 120,
            特困户数量: 220,
            军烈户数量: 150
          },
          {
            季度: '第二季度',
            贫困户数量: 332,
            低保户数量: 132,
            特困户数量: 182,
            军烈户数量: 232
          },
          {
            季度: '第三季度',
            贫困户数量: 301,
            低保户数量: 101,
            特困户数量: 191,
            军烈户数量: 201
          },
          {
            季度: '第四季度',
            贫困户数量: 334,
            低保户数量: 134,
            特困户数量: 234,
            军烈户数量: 154
          }
        ]
      },
      histogramChartSettings: {
        metrics: ['贫困户数量', '低保户数量', '特困户数量', '军烈户数量'],
        dimension: ['季度']
      },
      histogramChartMarkLine: {
        data: [[{ type: 'min' }, { type: 'max' }]]
      },
      lineChartData: {
        columns: ['日期', '访问量', '操作量'],
        rows: [
          {
            访问量: 1523,
            日期: '1月1日',
            操作量: 1523
          },
          {
            访问量: 1223,
            日期: '1月2日',
            操作量: 1523
          },
          {
            访问量: 2123,
            日期: '1月3日',
            操作量: 1523
          },
          {
            访问量: 4123,
            日期: '1月4日',
            操作量: 1523
          },
          {
            访问量: 3123,
            日期: '1月5日',
            操作量: 1523
          },
          {
            访问量: 7123,
            日期: '1月6日',
            操作量: 1523
          }
        ]
      },
      lineChartSettings: {
        metrics: ['访问量', '操作量'],
        dimension: ['日期']
      },
      lineChartMarkPoint: {
        data: [
          {
            name: '最大值',
            type: 'max'
          }
        ]
      },
      pieChartData: {
        columns: ['日期', '成本', '利润'],
        rows: [
          {
            日期: '1月1号',
            成本: 123,
            利润: 3
          },
          {
            日期: '1月2号',
            成本: 1223,
            利润: 6
          },
          {
            日期: '1月3号',
            成本: 2123,
            利润: 90
          },
          {
            日期: '1月4号',
            成本: 4123,
            利润: 12
          },
          {
            日期: '1月5号',
            成本: 3123,
            利润: 15
          },
          {
            日期: '1月6号',
            成本: 7123,
            利润: 20
          }
        ]
      },
      pieChartSettings: {
        dimension: '成本',
        metrics: '利润'
      },
      ringChartData: {
        columns: ['日期', '成本', '利润'],
        rows: [
          {
            日期: '1月1号',
            成本: 123,
            利润: 3
          },
          {
            日期: '1月2号',
            成本: 1223,
            利润: 6
          },
          {
            日期: '1月3号',
            成本: 2123,
            利润: 90
          },
          {
            日期: '1月4号',
            成本: 4123,
            利润: 12
          },
          {
            日期: '1月5号',
            成本: 3123,
            利润: 15
          },
          {
            日期: '1月6号',
            成本: 7123,
            利润: 20
          }
        ]
      },
      ringChartSettings: {
        dimension: '成本',
        metrics: '利润'
      }
    }
  },
  created: function() {},
  methods: {}
}
</script>

<template>
  <el-main>
    <el-scrollbar
      class="default-scrollbar"
      wrap-class="default-scrollbar__wrap"
      view-class="p20-scrollbar__view"
    >
      <el-row :gutter="20">
        <el-col :span="12" class="echarts-item">
          <div class="content-title">家庭状况</div>
          <ve-histogram
            :data="histogramChartData"
            :settings="histogramChartSettings"
            :mark-line="histogramChartMarkLine"
          />
        </el-col>
        <el-col :span="12" class="echarts-item">
          <div class="content-title">系统访问情况</div>
          <ve-line
            :data="lineChartData"
            :settings="lineChartSettings"
            :mark-point="lineChartMarkPoint"
          />
        </el-col>
        <el-col :span="12" class="echarts-item">
          <div class="content-title">土地承包情况</div>
          <ve-pie :data="pieChartData" :settings="pieChartSettings"/>
        </el-col>
        <el-col :span="12" class="echarts-item">
          <div class="content-title">意见情况</div>
          <ve-ring :data="ringChartData" :settings="ringChartSettings"/>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-main>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  padding: 10px 10px;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
