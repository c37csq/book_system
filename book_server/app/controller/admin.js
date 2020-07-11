'use strict';
const Controller = require('egg').Controller;

class AdminController extends Controller {

  // 登录接口
  async checkLogin () {
    let username = this.ctx.request.body.username
    let password = this.ctx.request.body.password
    const sql = " SELECT username FROM admin_user WHERE username = '" + username +
                "' AND password = '" + password + "'"
    const res = await this.app.mysql.query(sql)
    if(res.length > 0){
      let openId = new Date().getTime()
      this.ctx.session.openId = { 'openId': openId }
      this.ctx.body = { 'data': 'success', 'openId': openId }
    } else {
      this.ctx.body = { 'data': 'error' }
    }
  }

  // 获取轮播图图片
  async getBannerUrls () {
    let sql = 'SELECT banner.id as id, ' +
      'banner.imgUrl as imgUrl ' +
      'from banner'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 通过id获取轮播图地址
  async getBannerUrlsById () {
    let id = this.ctx.params.id
    let sql = 'SELECT banner.id as id, ' +
      'banner.imgUrl as imgUrl ' +
      'from banner where id =' + id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      res
    }
  }

  // 修改图片地址
  async updateBannerUrl () {
    let id = this.ctx.request.body.id
    let imgUrl = this.ctx.request.body.imgUrl
    let result = await this.app.mysql.update('banner',{ id: id, imgUrl: imgUrl });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '修改轮播图图片地址成功'
      }
    }
  }

  // 通过id删除图片
  async deleteBannerUrl () {
    let id = this.ctx.request.body.id
    let result = await this.app.mysql.delete('banner',{ id: id })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '删除成功！'
      }
    }
  }

  // 添加图片地址
  async addBannerUrl () {
    let imgUrl = this.ctx.request.body.imgUrl
    let result = await this.app.mysql.insert('banner', { imgUrl: imgUrl })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '添加成功！'
      }
    }
  }

  // 获取书籍列表
  async getBookList () {
    let sql = 'SELECT book_info.id as id ,' +
    'book_info.bookName as bookName ,' +
    'book_info.author as author ,' +
    "FROM_UNIXTIME(book_info.addTime,'%Y-%m-%d %H:%m:%S') as addTime ," +
    'book_info.bookImg as bookImg ,' +
    'book_info.bookDesc as bookDesc ,' +
    'book_info.view_count as view_count ,' +
    'book_info.type as type ,' +
    'book_info.creator as creator ,' +
    'book_info.creatorImg as creatorImg ,' +
    'book_info.price as price ,' +
    'book_info.email as email ,' +
    'book_info.creatorId as creatorId ,' +
    'book_info.likers as likers ,' +
    'book_info.likeCounts as likeCounts ' +
    'FROM book_info ' +
    'ORDER BY book_info.view_count DESC'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 获取指定id的书籍详情
  async getBookDetailById () {
    let id = this.ctx.params.id
    let sql = 'SELECT book_info.id as id ,' +
      'book_info.bookName as bookName ,' +
      'book_info.author as author ,' +
      'book_info.bookImg as bookImg ,' +
      "FROM_UNIXTIME(book_info.addTime,'%Y-%m-%d %H:%i:%S') as addTime ," +
      'book_info.view_count as view_count ,' +
      'book_info.type as type ,' +
      'book_info.bookDesc as bookDesc ,' +
      'book_info.creatorImg as creatorImg ,' +
      'book_info.creator as creator ,' +
      'book_info.price as price ,' +
      'book_info.email as email ,' +
      'book_info.creatorId as creatorId ,' +
      'book_info.likers as likers ' +
      'from book_info ' +
      'where book_info.id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  async getTypeNameById () {
    let id = this.ctx.params.id 
    let sql = 'select * from type where id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  async getBooksType () {
    let sql = 'select * from type'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  // 根据id修改分类
  async updateTypeName () {
    let id = this.ctx.request.body.id
    let typeName = this.ctx.request.body.typeName
    let result = await this.app.mysql.update('type',{ id: id, typeName: typeName });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '修改成功！'
      }
    }
  }

  async addTypeName () {
    let typeName = this.ctx.request.body.typeName
    let result = await this.app.mysql.insert('type', { typeName: typeName })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '添加成功！'
      }
    }
  }

   // 通过id删除分类
   async deleteTypeName () {
    let id = this.ctx.request.body.id
    let result = await this.app.mysql.delete('type',{ id: id })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '删除成功！'
      }
    }
  }

  // 删除父级评论列表
  async deleteParentComment () {
    let id = this.ctx.request.body.id
    let result = await this.app.mysql.delete('comments',{ id: id })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '删除成功！'
      }
    }
  }

  // 删除子级评论列表
  async deleteChildrenComment () {
    let id = this.ctx.request.body.id
    let result = await this.app.mysql.delete('comment_children',{ id: id })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '删除成功！'
      }
    }
  }

  async replaceChildrenId () {
    let id = this.ctx.request.body.id.toString()
    let sql = 'select id, childrenId from comments where find_in_set(' + id + ', childrenId)'
    const result = await this.app.mysql.query(sql)
    let parentId = result[0].id
    let childrenId = result[0].childrenId
    let length = childrenId.split(",").length - 1
    if (childrenId === id) {
      let pId = ""
      let result = await this.app.mysql.update('comments',{ id: parentId, childrenId: pId });
      if (result.affectedRows === 1) {
        this.ctx.body = {
          'msg': '更新成功！'
        }
      }
    } else if (childrenId.split(',')[length] === parentId) {
      let pId = childrenId.replace(',' + id, "")
      let result = await this.app.mysql.update('comments',{ id: parentId, childrenId: pId });
      if (result.affectedRows === 1) {
        this.ctx.body = {
          'msg': '更新成功啦！'
        }
      }
    } else {
      let pId = childrenId.replace(id + ',', "") 
      let result = await this.app.mysql.update('comments',{ id: parentId, childrenId: pId });
      if (result.affectedRows === 1) {
        this.ctx.body = {
          'msg': '更新成功了！'
        }
      }
    }
  }

  // 通过id更新书籍
  async updateBookType () {
    let id = this.ctx.request.body.id
    let sql = 'update book_info set type = 7 where type=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  // 获取父级评论列表
  async getParentMsgList () {
    let sql = 'SELECT comments.id as id ,' +
      'comments.likeCounts as likeCounts ,' +
      'comments.dislikeCounts as dislikeCounts ,' +
      'comments.author as author ,' +
      "FROM_UNIXTIME(comments.addTime,'%Y-%m-%d %H:%i:%S') as addTime ," +
      'comments.isRely as isRely ,' +
      'comments.childrenId as childrenId ,' +
      'comments.content as content ,' +
      'book_info.bookName as bookName ' +
      'from comments LEFT JOIN book_info ON comments.bookId = book_info.id'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

   // 获取子级评论列表
   async getChildrenMsgList () {
    let sql = 'SELECT comment_children.id as id ,' +
      'comment_children.likeCounts as likeCounts ,' +
      'comment_children.dislikeCounts as dislikeCounts ,' +
      'comment_children.author as author ,' +
      "FROM_UNIXTIME(comment_children.addTime,'%Y-%m-%d %H:%i:%S') as addTime ," +
      'comment_children.content as content ,' +
      'book_info.bookName as bookName ' +
      'from comment_children LEFT JOIN book_info ON comment_children.bookId = book_info.id'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 获取书籍分类数量
  async getBookTypeCounts () {
    let sql = 'select type.id as id ,' +
              'type.typeName as typeName ,' +
              'book_info.type as type ,' +
              'book_info.view_count as view_count ,' +
              'book_info.likeCounts as likeCounts ' +
              'from type left join book_info on type.id = book_info.type order by type.id'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  // 通过id获取父级评论列表内容
  async getParentContentById () {
    let id = this.ctx.params.id
    let sql = 'select id, content from comments where id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  // 通过id获取子级评论列表内容
  async getChildrenContentById () {
    let id = this.ctx.params.id
    let sql = 'select id, content from comment_children where id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  async updateParentContent () {
    let id = this.ctx.request.body.id
    let content = this.ctx.request.body.content
    let result = await this.app.mysql.update('comments',{ id: id, content: content });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '修改成功！'
      }
    }
  }

  async updateChildrenContent () {
    let id = this.ctx.request.body.id
    let content = this.ctx.request.body.content
    let result = await this.app.mysql.update('comment_children',{ id: id, content: content });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '修改成功！'
      }
    }
  }

}
module.exports = AdminController;
