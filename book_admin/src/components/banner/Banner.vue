<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
          <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="add_button">
        <el-button style="padding: 10px" type="success" @click="showAddBox">添加轮播图片</el-button>
      </div>
    </div>
    <div class="banner_list">
      <el-table
        border
        ref="singleTable"
        :data="bannerData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column property="imgUrl" label="轮播图片地址" width="950"></el-table-column>
        <el-table-column property="operate" label="编辑 或 删除">
          <template slot-scope="scope">
            <el-button type="success" size="medium" @click="showEditBox(scope.row.id)">编辑</el-button>
            <el-button size="medium" type="danger" @click="deleteImgById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加图片地址 -->
      <el-dialog
        title="添加图片地址"
        :visible.sync="addDialogVisible"
        width="55%"
        @close="addDialogClosed"
      >
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
          <el-form-item label="图片地址:" prop="imgUrl">
            <el-input v-model="addForm.imgUrl"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addImg">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑图片地址 -->
      <el-dialog
        title="编辑图片地址"
        :visible.sync="editDialogVisible"
        width="55%"
        @close="editDialogClosed"
      >
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
          <el-form-item label="图片地址:" prop="imgUrl">
            <el-input v-model="editForm.imgUrl"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editImg">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      bannerData: [],
      editDialogVisible: false,
      addDialogVisible: false,
      editForm: {
      },
      addForm: {
        imgUrl: ''
      },
      editFormRules: {
        imgUrl: [
          { required: true, message: '请输入图片地址', trigger: 'blur' },
          { validator: this.checkImgUrl, trigger: 'blur' }
        ]
      },
      addFormRules: {
        imgUrl: [
          { required: true, message: '请输入图片地址', trigger: 'blur' },
          { validator: this.checkImgUrl, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkImgUrl (rule, value, cb) {
      // 验证图片地址的正则
      const regImgUrl = /^http:\/\/.*?\/.*?\.jpg$/i
      if (regImgUrl.test(value)) return cb()
      cb(new Error('请输入合法的地址'))
    },
    // 获取轮播图片地址
    async getBannerImg () {
      const result = await this.$http.get('getBannerUrls')
      this.bannerData = result.data.data
    },
    // 修改图片
    async showEditBox (id) {
      const result = await this.$http.get('getBannerUrlsById/' + id)
      this.editForm = result.data.res[0]
      this.editDialogVisible = true
    },
    // 关闭窗口
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 关闭添加窗口
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 提交
    editImg () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$http.post('updateBannerUrl', this.editForm)
        if (result.status === 200) {
          this.$message.success('修改成功！')
          this.editDialogVisible = false
        }
      })
    },
    // 添加图片地址
    addImg () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$http.post('addBannerUrl', {
          imgUrl: this.addForm.imgUrl
        })
        if (result.status === 200) {
          this.$message.success('添加成功！')
          this.addDialogVisible = false
          this.getBannerImg()
        }
      })
    },
    // 删除轮播图片
    async deleteImgById (id) {
      const confirmResult = await this.$confirm('此操作将永远删除该轮播图片, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const result = await this.$http.post('deleteBannerUrl', {
        id: id
      })
      if (result.status === 200) {
        this.$message.success('删除成功！')
        this.getBannerImg()
      }
    },
    // 显示对话框
    showAddBox () {
      this.addDialogVisible = true
    }
  },
  created () {
    this.getBannerImg()
  }
}
</script>

<style lang="less" scoped>
.clearfix {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-breadcrumb {
  font-size: 16px;
}

.add_button {
  margin-right: 18px;
  .el-button {
    font-size: 15px;
  }
}
</style>
