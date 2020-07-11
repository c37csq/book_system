<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>留言管理</el-breadcrumb-item>
          <el-breadcrumb-item>留言列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="switch">
        <el-switch
          :change="changeList(value)"
          v-model="value"
          active-text="父级列表"
          inactive-text="子级列表"
        ></el-switch>
      </div>
    </div>
    <div class="msg_list">
      <el-table
        border
        ref="singleTable"
        :data="value === true ? parentMsgList : childrenMsgList"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column property="bookName" label="所属书籍" width="200"></el-table-column>
        <el-table-column property="author" label="评论者" width="80"></el-table-column>
        <el-table-column property="likeCounts" label="点赞" width="60"></el-table-column>
        <el-table-column property="dislikeCounts" label="差评" width="60"></el-table-column>
        <el-table-column property="content" label="评论内容" width="380"></el-table-column>
        <el-table-column v-if="value" property="children" label="子评论数" width="80"></el-table-column>
        <el-table-column property="addTime" label="评论时间" width="180"></el-table-column>
        <el-table-column property="operate" label="编辑 或 删除">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="showEditBox(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteMessageById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑评论内容 -->
      <el-dialog
        title="编辑评论内容"
        :visible.sync="editDialogVisible"
        width="55%"
        @close="editDialogClosed"
      >
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
          <el-form-item label="评论内容:" prop="content">
            <el-input type="textarea" :rows="3" v-model="editForm.content"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editContent">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      parentMsgList: [],
      childrenMsgList: [],
      value: true,
      editDialogVisible: false,
      editFormRules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      editForm: {
      }
    }
  },
  methods: {
    async getParentMsgList () {
      const result = await this.$http.get('getParentMsgList')
      const list = result.data.data
      list.forEach(item => {
        this.getChildCounts(item)
      })
      this.parentMsgList = list
    },
    async getChildrenMsgList () {
      const result = await this.$http.get('getChildrenMsgList')
      const list = result.data.data
      this.childrenMsgList = list
    },
    getChildCounts (comment) {
      if (comment.isRely === 0) {
        comment.children = 0
      } else {
        comment.children = comment.childrenId.split(',').length
      }
    },
    changeList (value) {
      if (value === false) {
        if (this.childrenMsgList.length === 0) {
          this.getChildrenMsgList()
        }
      } else {
        if (this.parentMsgList.length === 0) {
          this.getParentMsgList()
        }
      }
    },
    async showEditBox (id) {
      if (this.value === true) {
        const result = await this.$http.get('getParentContentById/' + id)
        this.editForm = result.data.data[0]
        this.editDialogVisible = true
      } else {
        const res = await this.$http.get('getChildrenContentById/' + id)
        this.editForm = res.data.data[0]
        this.editDialogVisible = true
      }
    },
    async deleteMessageById (id) {
      if (this.value === true) {
        const confirmResult = await this.$confirm('此操作将永远删除该父级评论列表, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除！')
        }
        const result = await this.$http.post('deleteParentComment', {
          id: id
        })
        if (result.status === 200) {
          this.$message.success('删除成功！')
          this.getParentMsgList()
        }
      } else {
        const confirmResult = await this.$confirm('此操作将永远删除该父级评论列表, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除！')
        }
        const result = await this.$http.post('deleteChildrenComment', {
          id: id
        })
        if (result.status === 200) {
          const res = await this.$http.post('replaceChildrenId', {
            id: id
          })
          if (res.status === 200) {
            this.$message.success('删除成功！')
            this.getChildrenMsgList()
          }
        }
      }
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editContent () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        if (this.value === true) {
          const result = await this.$http.post('updateParentContent', this.editForm)
          if (result.status === 200) {
            this.$message.success('修改成功！')
            this.getParentMsgList()
            this.editDialogVisible = false
          }
        } else {
          const result = await this.$http.post('updateChildrenContent', this.editForm)
          if (result.status === 200) {
            this.$message.success('修改成功！')
            this.getChildrenMsgList()
            this.editDialogVisible = false
          }
        }
      })
    }
  },
  created () {
    if (this.parentMsgList.length === 0) {
      this.getParentMsgList()
    }
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

.switch {
  margin-right: 18px;
  .el-switch {
    font-size: 18px;
  }
}
</style>
