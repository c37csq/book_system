<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
          <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="book_list">
      <el-table border ref="singleTable" :data="bookList" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column property="bookName" label="书 籍 名 字" width="230"></el-table-column>
        <el-table-column property="author" label="作 者" width="180"></el-table-column>
        <el-table-column property="creator" label="推 荐 者" width="150"></el-table-column>
        <el-table-column property="view_count" label="热 度" width="80"></el-table-column>
        <el-table-column property="price" label="价 格" width="80"></el-table-column>
        <el-table-column property="likeCounts" label="收藏人数" width="80"></el-table-column>
        <el-table-column property="addTime" label="创 建 时 间" width="180"></el-table-column>
        <el-table-column property="operate" label="编辑 或 删除">
          <template slot-scope="scope">
            <el-button type="success" size="medium" @click="toBookEdit(scope.row.id)">编辑</el-button>
            <el-button size="medium" type="danger" @click="deleteImgById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import config from '../../config/config.js'
export default {
  data () {
    return {
      bookList: []
    }
  },
  methods: {
    // 获取书籍列表
    async getBookList () {
      const result = await this.$http.get('getBookList')
      this.bookList = result.data.data
    },
    // 跳转编辑书籍页面
    toBookEdit (id) {
      this.$router.push('/list/editbook/' + id)
    },
    // 删除书籍
    async deleteImgById (id) {
      const confirmResult = await this.$confirm('此操作将永远删除该本书籍, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const result = await this.$http.post(config.BASE_URL_DEFAULT + 'deleteBookById', {
        id: id
      })
      if (result.status === 200) {
        this.$message.success('删除成功！')
        this.getBookList()
      }
    }
  },
  created () {
    this.getBookList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 16px;
}
</style>
