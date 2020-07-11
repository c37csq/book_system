<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>扇形图数据展示</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="Echarts">
      <div id="main" style="width: 100%; height: 660px;border: 1px solid #ccc;"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      option: {
      }
    }
  },
  methods: {
    async myEcharts () {
      var myChart = this.$echarts.init(document.getElementById('main'))
      const res = await this.$http.get('getBookTypeCounts')
      const count = res.data.data
      const hots = count.reduce((prev, current, index, arr) => {
        if (current.typeName in prev) {
          prev[current.typeName] = prev[current.typeName] + current.view_count
        } else {
          prev[current.typeName] = current.view_count
        }
        return prev
      }, {})
      const hotArr = []
      for (const key in hots) {
        hotArr.push({
          name: key,
          value: hots[key]
        })
      }
      this.option = {
        title: {
          text: '书籍热度展示'
        },
        tooltip: {},
        legend: {
          data: ['书籍热度']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          type: 'pie',
          name: '书籍热度',
          data: hotArr
        }]
      }
      myChart.setOption(this.option)
    },
    getTypeName (bookTypes) {
      return bookTypes.map(item => {
        return item.typeName
      })
    }
  },
  mounted () {
    this.myEcharts()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 16px;
}
</style>
