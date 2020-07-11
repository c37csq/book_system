<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>折线图数据展示</el-breadcrumb-item>
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
      const result = await this.$http.get('getBooksType')
      const res = await this.$http.get('getBookTypeCounts')
      const count = res.data.data
      const countTypes = count.reduce((allTypes, type) => {
        if (type.typeName in allTypes) {
          allTypes[type.typeName]++
        } else {
          allTypes[type.typeName] = 1
        }
        return allTypes
      }, {})
      // const hots = count.reduce((prev, current, index, arr) => {
      //   if (current.typeName in prev) {
      //     prev[current.typeName] = prev[current.typeName] + current.view_count
      //   } else {
      //     prev[current.typeName] = current.view_count
      //   }
      //   return prev
      // }, {})
      const likes = count.reduce((prev, current, index, arr) => {
        if (current.typeName in prev) {
          prev[current.typeName] = prev[current.typeName] + current.likeCounts
        } else {
          prev[current.typeName] = current.likeCounts
        }
        return prev
      }, {})
      const countData = Object.values(countTypes)
      // const hotData = Object.values(hots)
      const likeData = Object.values(likes)
      const list = this.getTypeName(result.data.data)
      this.option = {
        title: {
          text: '书籍数据展示'
        },
        tooltip: {},
        legend: {
          data: ['书籍数量', '收藏人数']
        },
        xAxis: {
          data: list
        },
        yAxis: {},
        series: [{
          name: '书籍数量',
          type: 'line',
          data: countData
        }, {
          name: '收藏人数',
          type: 'line',
          data: likeData
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
