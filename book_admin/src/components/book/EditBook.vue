<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/list' }">书籍列表</el-breadcrumb-item>
          <el-breadcrumb-item>编辑书籍</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="edit_book_form">
      <el-form
        :model="editBookForm"
        :rules="editFormRules"
        ref="editBookForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item size="medium" label="书籍名称" prop="bookName">
          <el-input v-model="editBookForm.bookName"></el-input>
        </el-form-item>
        <el-form-item size="medium" label="作者" prop="author">
          <el-input v-model="editBookForm.author"></el-input>
        </el-form-item>
        <el-form-item size="medium" label="价格" prop="price">
          <el-input-number
            :precision="2"
            :step="0.1"
            :min="1"
            :max="10000"
            controls-position="right"
            v-model="editBookForm.price"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="书籍类别" prop="type">
          <el-select v-model="editBookForm.type" placeholder="请选择书籍类别">
            <el-option
              v-for="item in booksType"
              :key="item.id"
              :label="item.typeName"
              :value="item.typeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="medium" label="书籍图片" prop="bookImg">
          <el-upload
            :action="config.BASE_URL_DEFAULT + 'uploadFile'"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="uploadImg"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onLimit"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="书籍描述" prop="bookDesc">
          <div class="wang-editor">
            <div id="editor" class="editor">
              <span v-html="editBookForm.bookDesc"></span>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="editBookForm.bookImg" />
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import config from '../../config/config.js'
import Editor from 'wangeditor'
export default {
  data () {
    return {
      editor: null,
      editorContent: '',
      bookId: '',
      imgUrl: '',
      config: config,
      dialogVisible: false,
      fileList: [{
        name: '',
        url: ''
      }],
      editBookForm: {
        bookName: '',
        author: '',
        price: '',
        type: '',
        bookImg: '',
        bookDesc: ''
      },
      booksType: [],
      editFormRules: {
        bookName: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入书籍价格', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入书籍类别', trigger: 'change' }
        ],
        bookDesc: [
          { required: true, message: '请输入书籍描述', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    const id = this.$route.params.id
    this.getBookDetailById(id)
    this.getBooksType()
  },
  mounted () {
    this.createEditor()
  },
  methods: {
    async getBookDetailById (id) {
      const result = await this.$http.get('getBookDetailById/' + id)
      const typeId = result.data.data[0].type
      const type = await this.getTypeNameById(typeId)
      result.data.data[0].type = type
      const fileName = this.getFileNameByUrl(result.data.data[0].bookImg)
      this.fileList[0].name = fileName
      this.fileList[0].url = result.data.data[0].bookImg
      this.editBookForm = result.data.data[0]
    },
    async getTypeNameById (id) {
      const result = await this.$http.get('getTypeNameById/' + id)
      return result.data.data[0].typeName
    },
    async getBooksType () {
      const result = await this.$http.get('getBooksType')
      this.booksType = result.data.data
    },
    // 通过图片地址获取文件名
    getFileNameByUrl (url) {
      return url.replace(config.BASE_IMG_URL, '')
    },
    // 超出上传图片
    onLimit () {
      this.$message.warning('只能上传一张图片！')
    },
    async handleRemove (file, fileList) {
      const name = this.fileList[0].name
      const result = await this.$http.post(config.BASE_URL_DEFAULT + 'deleteImg', {
        name: name
      })
      if (result.status === 200) {
        this.$message.success('删除图片成功！')
        this.fileList = []
      } else {
        this.$message.error('删除图片失败！')
      }
    },
    async uploadImg (response, file, fileList) {
      if (response.status === 200) {
        this.$message.success('上传图片成功！')
        const name = response.filename
        const url = config.BASE_IMG_URL + response.filename
        this.fileList.push({
          name: name,
          url: url
        })
      }
    },
    handlePictureCardPreview (file) {
      this.dialogVisible = true
    },
    createEditor () {
      this.editor = new Editor('#editor')
      this.editor.customConfig.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'foreColor',
        'backColor',
        'link',
        'list',
        'justify',
        'quote',
        'emoticon',
        'image',
        'table',
        'video',
        'code',
        'undo',
        'redo'
      ]
      this.editor.customConfig.onchangeTimeout = 1000
      this.editor.customConfig.zIndex = 100000
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.customConfig.pasteIgnoreImg = true
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.customConfig.pasteIgnoreImg = true
      this.editor.customConfig.onblur = (html) => {
        this.editBookForm.bookDesc = html
      }
      this.editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
      ]
      this.editor.create()
    },
    async onSubmit () {
      const dataProps = {
        bookId: this.editBookForm.id,
        bookName: this.editBookForm.bookName,
        author: this.editBookForm.author,
        typeName: this.editBookForm.type,
        price: this.editBookForm.price.toString(),
        img: this.fileList[0].name,
        detail: this.editor.txt.html()
      }
      const result = await this.$http.post(config.BASE_URL_DEFAULT + 'updateBook', dataProps)
      if (result.status === 200) {
        this.$message.success('更新成功！')
        this.$router.push('/list')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 16px;
}

.el-form-item {
  width: 800px;
}
</style>
