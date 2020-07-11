<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
          <el-breadcrumb-item>书籍分类列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="add_button">
        <el-button style="padding: 10px" type="success" @click="showAddBox">添加书籍分类</el-button>
      </div>
    </div>
    <div class="type_list">
      <el-table :data="typeList" border ref="typeTable" highlight-current-row style="width: 50%">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column property="typeName" label="分类名称" width="250"></el-table-column>
        <el-table-column property="operate" label="编辑 或 删除">
          <template slot-scope="scope">
            <el-button type="success" size="medium" @click="showEditBox(scope.row.id)">编辑</el-button>
            <el-button size="medium" type="danger" @click="deleteTypeById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑图片地址 -->
      <el-dialog
        title="编辑书籍分类"
        :visible.sync="editDialogVisible"
        width="55%"
        @close="editDialogClosed"
      >
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
          <el-form-item label="书籍分类:" prop="typeName">
            <el-input v-model="editForm.typeName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTypeName">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="添加书籍分类"
        :visible.sync="addDialogVisible"
        width="55%"
        @close="addDialogClosed"
      >
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
          <el-form-item label="书籍分类:" prop="typeName">
            <el-input v-model="addForm.typeName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTypeName">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import config from '../../config/config.js'
export default {
  data () {
    return {
      typeList: [],
      editDialogVisible: false,
      addDialogVisible: false,
      editForm: {
      },
      addForm: {
        typeName: ''
      },
      editFormRules: {
        typeName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      addFormRules: {
        typeName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getTypeList () {
      const result = await this.$http.get(config.BASE_URL_DEFAULT + 'getTypesInfo')
      this.typeList = result.data.data
    },
    // 关闭窗口
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    editTypeName () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$http.post('updateTypeName', this.editForm)
        if (result.status === 200) {
          this.$message.success('修改成功！')
          this.getTypeList()
          this.editDialogVisible = false
        }
      })
    },
    addTypeName () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$http.post('addTypeName', {
          typeName: this.addForm.typeName
        })
        if (result.status === 200) {
          this.$message.success('添加成功！')
          this.addDialogVisible = false
          this.getTypeList()
        }
      })
    },
    async showEditBox (id) {
      const res = this.typeList.filter(item => {
        return item.id === id
      })
      this.editForm = res[0]
      this.editDialogVisible = true
    },
    async deleteTypeById (id) {
      const confirmResult = await this.$confirm('此操作将永远删除该书籍分类, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const result = await this.$http.post('deleteTypeName', {
        id: id
      })
      if (result.status === 200) {
        const res = await this.$http.post('updateBookType', {
          id: id
        })
        if (res.status === 200) {
          this.$message.success('删除成功,并将之前所属分类更改为其他书籍分类！')
          this.getTypeList()
        }
      }
    },
    showAddBox () {
      this.addDialogVisible = true
    }
  },
  created () {
    this.getTypeList()
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
