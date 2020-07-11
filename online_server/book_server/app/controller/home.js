'use strict';
const Controller = require('egg').Controller;
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '..', 'public/uploads')
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

class HomeController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.body = 'hi, 你好';
  }

  // 获取书籍列表
  async getBooksList () {
    let sql = 'SELECT book_info.id as id ,' +
      'book_info.bookName as bookName ,' +
      'book_info.author as authName ,' +
      "FROM_UNIXTIME(book_info.addTime,'%Y-%m-%d %H:%m:%S') as addTime ," +
      'book_info.bookImg as bookImg ,' +
      'book_info.view_count as view_count ' +
      'FROM book_info ' +
      'ORDER BY book_info.view_count DESC'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 获取轮播图图片
  async getBanners () {
    let sql = 'SELECT banner.id as id, ' +
      'banner.imgUrl as imgUrl ' +
      'from banner'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 获取书籍类别
  async getTypesInfo () {
    let sql = 'SELECT type.id as id, ' +
      'type.typeName as typeName ' +
      'from type'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 获取指定类别书籍
  async getBooksListById () {
    let id = this.ctx.params.id
    let sql = 'SELECT book_info.id as id ,' +
      'book_info.bookName as bookName ,' +
      'book_info.author as authName ,' +
      'book_info.bookImg as bookImg ,' +
      "FROM_UNIXTIME(book_info.addTime,'%Y-%m-%d %H:%i:%S') as addTime ," +
      'book_info.view_count as view_count ,' +
      'book_info.type as type ' +
      'from book_info ' +
      'where type=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 获取指定id的书籍详情
  async getBookDetailById () {
    let id = this.ctx.params.id
    let sql = 'SELECT book_info.id as id ,' +
      'book_info.bookName as bookName ,' +
      'book_info.author as authName ,' +
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

  // 根据类别id获取类别名称
  async getTypeById () {
    let id = this.ctx.params.id
    let sql = 'SELECT type.typeName as typeName from type where type.id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 添加书籍
  async addBook () {
    let typeName = this.ctx.request.body.typeName
    let bookName = this.ctx.request.body.bookName
    let author = this.ctx.request.body.author
    let price = this.ctx.request.body.price
    let img = this.ctx.request.body.img
    let likers = this.ctx.request.body.likers
    let bookImg = 'https://bookapi.c37.ltd/public/uploads/' + img
    let bookDesc = this.ctx.request.body.detail
    let addTime = this.ctx.request.body.time
    let creatorImg = this.ctx.request.body.avatar_url
    let creator = this.ctx.request.body.username
    let email = this.ctx.request.body.email
    let view_count = this.ctx.request.body.view_count
    let creatorId = this.ctx.request.body.creatorId
    const sql = " SELECT id FROM type WHERE typeName = '" + typeName + "'"
    const res = await this.app.mysql.query(sql)
    let type = res[0].id
    let result = await this.app.mysql.insert("book_info", { bookName, author, bookImg, bookDesc, addTime, view_count, type, creator, creatorImg, price, email, creatorId, likers });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '添加成功',
        'status': 200
      }
    }
  }

  // 修改书籍
  async updateBook () {
    let bookId = this.ctx.request.body.bookId
    let bookName = this.ctx.request.body.bookName
    let author = this.ctx.request.body.author
    let typeName = this.ctx.request.body.typeName
    let price = this.ctx.request.body.price
    let imgName = this.ctx.request.body.img
    let bookDesc = this.ctx.request.body.detail
    let bookImg = 'https://bookapi.c37.ltd/public/uploads/' + imgName
    const sql = " SELECT id FROM type WHERE typeName = '" + typeName + "'"
    const res = await this.app.mysql.query(sql)
    let type = res[0].id
    let result = await this.app.mysql.update('book_info', { id: bookId, bookName, author, bookImg, bookDesc, type, price })
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '更新成功',
        'status': 200
      }
    }
  }

  // 删除图片
  async deleteImg () {
    let filename = this.ctx.request.body.name
    this.ctx.body = {
      dirPath,
      filename
    }
    fs.unlink(path.join(dirPath, '/' + filename), (err) => {
      if (err) {
        this.ctx.body = {
          data: {
            msg: "删除失败",
            status: 500
          }
        }
      } else {
        this.ctx.body = {
          data: {
            msg: "删除成功",
            status: 200
          }
        }
      }
    })
  }

  // 上传图片
  async uploadFile () {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const reg = /[\u4e00-\u9fa5]/g;
    //新建一个文件名
    const filename = Date.now() + (stream.filename.replace(reg, ""))
    //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    //生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    const url = `/public/uploads/${filename}`
    //文件响应
    ctx.body = { url, filename, status: 200 };
  }

  // github登录
  async githubLogin () {
    var code = this.ctx.query.code
    var clientID = '2ab48886a8712142e99e'
    var clientSecret = '254d5a309466e20c3db973e5c97a20ffb32aa14e'
    var url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`
    var res = await this.ctx.curl(url, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },
      dataType: 'json'
    })
    let accessToken = res.data.access_token
    
    var result = await this.ctx.curl('https://api.github.com/user', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`
      },
      dataType: 'json'
    })
  
    var username = result.data.login
    var id = result.data.id
    var avatar_url = result.data.avatar_url
    var email = result.data.email
    var sql = 'select * from user where id=' + id
    var selectResult = await this.app.mysql.query(sql)
  
    if (selectResult.length == 0) {
      let insertInfo = await this.app.mysql.insert('user', { id, username, avatar_url, email });
      if (insertInfo.affectedRows === 1) {
        let sql = 'select * from user where id=' + id
        const selectRes = await this.app.mysql.query(sql)
        this.ctx.body = {
          data: selectRes
        }
      }
    } else {
      this.ctx.body = {
        data: selectResult
      }
    }
  }

  // 百度登录
  async baiduLogin () {
    var code = this.ctx.query.code
    var api_key = 'BKpwO1ewmVliTSMlQCjf5155'
    var secret_key = '1LX2zjyf10O8Q68c3wpbD7x1Zodlu6m1'
    var redirect_uri = 'https://book.c37.ltd/#/home'
    var url = `https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=${code}&client_id=${api_key}&client_secret=${secret_key}&redirect_uri=${redirect_uri}`
    var res = await this.ctx.curl(url, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },
      dataType: 'json'
    })
    let accessToken = res.data.access_token
    var result = await this.ctx.curl('https://openapi.baidu.com/rest/2.0/passport/users/getInfo?access_token=' + accessToken, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      },
      dataType: 'json'
    })
    let username = result.data.username
    let id = result.headers.appid 
    let avatar_url = 'http://tb.himg.baidu.com/sys/portraitn/item/' + result.data.portrait
    let email = ""
    var sql = 'select * from user where id=' + id
    var selectResult = await this.app.mysql.query(sql)
    if (selectResult.length == 0) {
      let insertInfo = await this.app.mysql.insert('user', { id, username, avatar_url, email });
      if (insertInfo.affectedRows === 1) {
        let sql = 'select * from user where id=' + id
        const selectRes = await this.app.mysql.query(sql)
        this.ctx.body = {
          data: selectRes
        }
      }
    } else {
      this.ctx.body = {
        data: selectResult
      }
    }
  }

  //设置浏览量
  async setViewCount () {
    let id = this.ctx.request.body.id;
    let view_count = this.ctx.request.body.view_count;
    const result = await this.app.mysql.update('book_info', { id: id, view_count: view_count + 1 });
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }

  //不允许同一个人重复添加相同书籍
  async findBookNameById () {
    let id = this.ctx.params.id
    let sql = 'SELECT book_info.bookName from book_info where book_info.creatorId =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  //获取父级评论列表
  async getParentCommentsList () {
    let sql = 'SELECT comments.id as id ,' +
      'comments.likeCounts as likeCounts ,' +
      'comments.dislikeCounts as dislikeCounts ,' +
      'comments.author as author ,' +
      'comments.avatar_url as avatar_url ,' +
      "FROM_UNIXTIME(comments.addTime,'%Y-%m-%d %H:%i:%S') as addTime ," +
      'comments.isRely as isRely ,' +
      'comments.childrenId as childrenId ,' +
      'comments.content as content ,' +
      'comments.bookId as bookId ,' +
      'comments.likerIds as likerIds ,' +
      'comments.dislikerIds as dislikerIds ' +
      'from comments'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 通过id请求子列表
  async getChildrenCommentsList () {
    let id = this.ctx.params.id
    let sql = 'SELECT comment_children.id as id ,' +
      'comment_children.likeCounts as likeCounts ,' +
      'comment_children.dislikeCounts as dislikeCounts ,' +
      'comment_children.author as author ,' +
      'comment_children.avatar_url as avatar_url ,' +
      "FROM_UNIXTIME(comment_children.addTime,'%Y-%m-%d %H:%i:%S') as addTime ," +
      'comment_children.content as content ,' +
      'comment_children.bookId as bookId ,' +
      'comment_children.relyTo as relyTo ,' +
      'comment_children.dislikerIds as dislikerIds ,' +
      'comment_children.likerIds as likerIds ' +
      'from comment_children ' +
      'where comment_children.id=' + id +
      ' order by comment_children.addTime desc'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 发表父级评论
  async addParentComment () {
    let likeCounts = this.ctx.request.body.likeCounts
    let dislikeCounts = this.ctx.request.body.dislikeCounts
    let author = this.ctx.request.body.author
    let avatar_url = this.ctx.request.body.avatar_url
    let addTime = this.ctx.request.body.addTime
    let isRely = this.ctx.request.body.isRely
    let childrenId = this.ctx.request.body.childrenId
    let content = this.ctx.request.body.content
    let bookId = this.ctx.request.body.bookId
    let likerIds = this.ctx.request.body.likerIds
    let dislikerIds = this.ctx.request.body.dislikerIds
    let result = await this.app.mysql.insert("comments", { likeCounts, dislikeCounts, author, avatar_url, addTime, isRely, childrenId, content, bookId, likerIds, dislikerIds });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '添加成功',
        'status': 200
      }
    }
  }

  // 回复评论 
  async relyComment () {
    let parentId = this.ctx.request.body.parentId
    let likeCounts = this.ctx.request.body.likeCounts
    let dislikeCounts = this.ctx.request.body.dislikeCounts
    let author = this.ctx.request.body.author
    let avatar_url = this.ctx.request.body.avatar_url
    let addTime = this.ctx.request.body.addTime
    let content = this.ctx.request.body.content
    let bookId = this.ctx.request.body.bookId
    let relyTo = this.ctx.request.body.relyTo
    let likerIds = this.ctx.request.body.likerIds
    let dislikerIds = this.ctx.request.body.dislikerIds
    let result = await this.app.mysql.insert("comment_children", { likeCounts, dislikeCounts, author, avatar_url, addTime, content, bookId, relyTo, likerIds, dislikerIds });

    if (result.affectedRows === 1) {
      // result.insertId
      let sql = 'select isRely, childrenId from comments where id=' + parentId
      const res = await this.app.mysql.query(sql)
      if (res[0].isRely === 0 && res[0].childrenId == "") {
        const childrenId = (result.insertId).toString()
        const message = await this.app.mysql.update("comments", { id: parentId, isRely: 1, childrenId: childrenId })
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const info = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '回复成功',
          'status': 200,
          'childrenId': info[0].childrenId,
          'isRely': info[0].isRely
        }
      } else {
        const insertId = (result.insertId).toString()
        const childId = res[0].childrenId + ',' + insertId
        const message = await this.app.mysql.update("comments", { id: parentId, isRely: 1, childrenId: childId })
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const info = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '回复成功',
          'status': 200,
          'childrenId': info[0].childrenId,
          'isRely': info[0].isRely
        }
      }
    }
  }

  // 收藏书籍
  async likeBook () {
    let userId = this.ctx.request.body.userId
    let bookId = this.ctx.request.body.bookId
    let sql = 'select likers, likeCounts from book_info where book_info.id=' + bookId
    const result = await this.app.mysql.query(sql)
    const res = result[0].likers
    const counts = result[0].likeCounts
    if (res === "") {
      const likers = res + userId
      const likeCounts = counts + 1
      let updateInfo = await this.app.mysql.update('book_info', { id: bookId, likers: likers, likeCounts: likeCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          data: {
            'status': '200'
          }
        }
      }
    } else {
      if (res.indexOf(userId) < 0) {
        const likers = res + ',' + userId
        const likeCounts = counts + 1
        let updateInfo = await this.app.mysql.update('book_info', { id: bookId, likers: likers, likeCounts: likeCounts })
        if (updateInfo.affectedRows === 1) {
          this.ctx.body = {
            data: {
              'status': '200'
            }
          }
        }
      } else {
        this.ctx.body = {
          data: {
            'status': 300
          }
        }
      }
    }
  }

  // 关注用户
  async likePerson () {
    let fanId = this.ctx.request.body.fanIds
    let userId = this.ctx.request.body.userId
    let sql = 'select fanIds, fans from user where id=' + userId
    const res = await this.app.mysql.query(sql)

    if (res[0].fanIds === "") {
      let fanIds = fanId.toString()
      let fans = res[0].fans + 1
      let updateInfo = await this.app.mysql.update('user', { id: userId, fanIds: fanIds, fans: fans })
      if (updateInfo.affectedRows === 1) {
        let sql2 = 'select likeIds, likeCounts from user where id=' + fanId
        const result = await this.app.mysql.query(sql2)
        if (result[0].likeIds === "") {
          let likeIds = userId.toString()
          let likeCounts = result[0].likeCounts + 1
          let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
          if (updateInfo2.affectedRows === 1) {
            this.ctx.body = {
              'msg': '你是第一个关注成功的！'
            }
          }
        }
        else {
          let likeIds = result[0].likeIds + "," + userId.toString()
          let likeCounts = result[0].likeCounts + 1
          let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
          if (updateInfo2.affectedRows === 1) {
            this.ctx.body = {
              'msg': '关注成功！'
            }
          }
        }
      }
    }
    else {
      let fanIds = res[0].fanIds + "," + fanId
      let fans = res[0].fans + 1
      let updateInfo = await this.app.mysql.update('user', { id: userId, fanIds: fanIds, fans: fans })
      if (updateInfo.affectedRows === 1) {
        let sql2 = 'select likeIds, likeCounts from user where id=' + fanId
        const result = await this.app.mysql.query(sql2)
        if (result.likeIds === "") {
          let likeIds = userId.toString()
          let likeCounts = result[0].likeCounts + 1
          let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
          if (updateInfo2.affectedRows === 1) {
            this.ctx.body = {
              'msg': '你是第一个关注成功的！'
            }
          }
        } else {
          let likeIds = result[0].likeIds + "," + userId.toString()
          let likeCounts = result[0].likeCounts + 1
          let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
          if (updateInfo2.affectedRows === 1) {
            this.ctx.body = {
              'msg': '关注成功！'
            }
          }
        }
      }
    }
  }

  // 取消关注
  async dislikePerson () {
    let fanId = this.ctx.request.body.fanIds
    let userId = this.ctx.request.body.userId
    let sql = 'select fanIds, fans from user where id=' + userId
    const res = await this.app.mysql.query(sql)

    if (res[0].fanIds === fanId.toString()) {
      let fanIds = ""
      let fans = res[0].fans - 1
      let updateInfo = await this.app.mysql.update('user', { id: userId, fanIds: fanIds, fans: fans })
      if (updateInfo.affectedRows === 1) {
        let sql2 = 'select likeIds, likeCounts from user where id=' + fanId
        const result = await this.app.mysql.query(sql2)
        if (result[0].likeIds === userId.toString()) {
          let likeIds = ""
          let likeCounts = result[0].likeCounts - 1
          let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
          if (updateInfo2.affectedRows === 1) {
            this.ctx.body = {
              'msg': '取消关注成功！'
            }
          }
        } else {
          if (result[0].likeIds.split(",")[result[0].likeCounts - 1] === userId.toString()) {
            let likeIds = result[0].likeIds.replace("," + userId.toString(), "")
            let likeCounts = result[0].likeCounts - 1
            let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
            if (updateInfo2.affectedRows === 1) {
              this.ctx.body = {
                'msg': '取消关注成功啦！'
              }
            }
          } else {
            let likeIds = result[0].likeIds.replace(userId.toString() + ",", "")
            let likeCounts = result[0].likeCounts - 1
            let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
            if (updateInfo2.affectedRows === 1) {
              this.ctx.body = {
                'msg': '取消关注成功哦！'
              }
            }
          }
        }
      }
    }
    else {
      if (res[0].fanIds.split(",")[res[0].fans - 1] === fanId.toString()) {
        let fanIds = res[0].fanIds.replace("," + fanId.toString(), "")
        let fans = res[0].fans - 1
        let updateInfo = await this.app.mysql.update('user', { id: userId, fanIds: fanIds, fans: fans })
        if (updateInfo.affectedRows === 1) {
          let sql2 = 'select likeIds, likeCounts from user where id=' + fanId
          const result = await this.app.mysql.query(sql2)
          if (result[0].likeIds === userId) {
            let likeIds = ""
            let likeCounts = result[0].likeCounts - 1
            let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
            if (updateInfo2.affectedRows === 1) {
              this.ctx.body = {
                'msg': '取消关注成功！'
              }
            }
          } else {
            if (result[0].likeIds.split(",")[result[0].likeCounts - 1] === userId.toString()) {
              let likeIds = result[0].likeIds.replace("," + userId.toString(), "")
              let likeCounts = result[0].likeCounts - 1
              let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
              if (updateInfo2.affectedRows === 1) {
                this.ctx.body = {
                  'msg': '取消关注成功啦！'
                }
              }
            } else {
              let likeIds = result[0].likeIds.replace(userId.toString() + ",", "")
              let likeCounts = result[0].likeCounts - 1
              let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
              if (updateInfo2.affectedRows === 1) {
                this.ctx.body = {
                  'msg': '取消关注成功哦！'
                }
              }
            }
          }
        }
      } else {
        let fanIds = res[0].fanIds.replace(fanId.toString() + ",", "")
        let fans = res[0].fans - 1
        let updateInfo = await this.app.mysql.update('user', { id: userId, fanIds: fanIds, fans: fans })
        if (updateInfo.affectedRows === 1) {
          let sql2 = 'select likeIds, likeCounts from user where id=' + fanId
          const result = await this.app.mysql.query(sql2)
          if (result[0].likeIds === userId) {
            let likeIds = ""
            let likeCounts = result[0].likeCounts - 1
            let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
            if (updateInfo2.affectedRows === 1) {
              this.ctx.body = {
                'msg': '取消关注成功！'
              }
            }
          } else {
            if (result[0].likeIds.split(",")[result[0].likeCounts - 1] === userId.toString()) {
              let likeIds = result[0].likeIds.replace("," + userId.toString(), "")
              let likeCounts = result[0].likeCounts - 1
              let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
              if (updateInfo2.affectedRows === 1) {
                this.ctx.body = {
                  'msg': '取消关注成功啦！'
                }
              }
            } else {
              let likeIds = result[0].likeIds.replace(userId.toString() + ",", "")
              let likeCounts = result[0].likeCounts - 1
              let updateInfo2 = await this.app.mysql.update('user', { id: fanId, likeIds: likeIds, likeCounts: likeCounts })
              if (updateInfo2.affectedRows === 1) {
                this.ctx.body = {
                  'msg': '取消关注成功哦！'
                }
              }
            }
          }
        }
      }
    }
  }

  // 取消收藏
  async dislikeBook () {
    let userId = this.ctx.request.body.userId
    let bookId = this.ctx.request.body.bookId
    let sql = 'select likers, likeCounts from book_info where book_info.id=' + bookId
    const result = await this.app.mysql.query(sql)
    const res = result[0].likers
    const counts = result[0].likeCounts
    if (res.indexOf(userId) >= 0 && res === userId) {
      const likers = ""
      const likeCounts = counts - 1
      let updateInfo = await this.app.mysql.update('book_info', { id: bookId, likers: likers, likeCounts: likeCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          data: {
            'status': '200'
          }
        }
      }
    } else if (res.indexOf(userId) >= 0 && res.split(",")[counts - 1] === userId) {
      const likers = res.replace("," + userId, "")
      const likeCounts = counts - 1
      let updateInfo = await this.app.mysql.update('book_info', { id: bookId, likers: likers, likeCounts: likeCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          data: {
            'status': '200'
          }
        }
      }
    } else if (res.indexOf(userId) >= 0 && res.split(",")[counts - 1] !== userId) {
      const likers = res.replace(userId + ",", "")
      const likeCounts = counts - 1
      let updateInfo = await this.app.mysql.update('book_info', { id: bookId, likers: likers, likeCounts: likeCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          data: {
            'status': '200'
          }
        }
      }
    }
  }

  // 点赞用户
  async goodPerson () {
    let userId = this.ctx.request.body.userId  // string
    let goodIds = this.ctx.request.body.goodIds // number
    let sql = 'select goodIds, goodCounts from user where user.id=' + userId
    const res = await this.app.mysql.query(sql)
    if (res[0].goodIds === "") {
      const goodId = goodIds.toString()
      const goodCounts = res[0].goodCounts + 1
      const updateInfo = await this.app.mysql.update('user', { id: parseInt(userId), goodIds: goodId, goodCounts: goodCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你是第一个给他点赞的！'
        }
      }
    } else {
      const goodId = res[0].goodIds + "," + goodIds.toString()
      const goodCounts = res[0].goodCounts + 1
      const updateInfo = await this.app.mysql.update('user', { id: parseInt(userId), goodIds: goodId, goodCounts: goodCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          'msg': '点赞成功！'
        }
      }
    }
  }

  // 取消点赞
  async disgoodPerson () {
    let userId = this.ctx.request.body.userId  // string
    let goodIds = this.ctx.request.body.goodIds // number
    let sql = 'select goodIds, goodCounts from user where user.id=' + userId
    const res = await this.app.mysql.query(sql)
    if (res[0].goodIds === goodIds.toString()) {
      const goodId = ""
      const goodCounts = res[0].goodCounts - 1
      const updateInfo = await this.app.mysql.update('user', { id: parseInt(userId), goodIds: goodId, goodCounts: goodCounts })
      if (updateInfo.affectedRows === 1) {
        this.ctx.body = {
          'msg': '取消点赞成功！'
        }
      }
    } else {
      if (res[0].goodIds.split(",")[res[0].goodCounts - 1] === goodIds.toString()) {
        const goodId = res[0].goodIds.replace("," + goodIds.toString(), "")
        const goodCounts = res[0].goodCounts - 1
        const updateInfo = await this.app.mysql.update('user', { id: parseInt(userId), goodIds: goodId, goodCounts: goodCounts })
        if (updateInfo.affectedRows === 1) {
          this.ctx.body = {
            'msg': '取消点赞成功了！'
          }
        }
      } else {
        const goodId = res[0].goodIds.replace(goodIds.toString() + ",", "")
        const goodCounts = res[0].goodCounts - 1
        const updateInfo = await this.app.mysql.update('user', { id: parseInt(userId), goodIds: goodId, goodCounts: goodCounts })
        if (updateInfo.affectedRows === 1) {
          this.ctx.body = {
            'msg': '取消点赞成功啦！'
          }
        }
      }
    }
  }

  // 点赞父级评论
  async addParentGood () {
    let id = this.ctx.request.body.parentId
    let userId = this.ctx.request.body.userId
    let sql = 'select likeCounts, likerIds from comments where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].likerIds.indexOf(userId) >= 0) {
      this.ctx.body = {
        'msg': '当前用户已经点赞过了！'
      }
    } else {
      if (result[0].likerIds === "") {
        const likerIds = userId
        const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '你是第一个点赞成功！'
          }
        }
      } else {
        const likerIds = result[0].likerIds + ',' + userId
        const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '点赞成功！'
          }
        }
      }
    }
  }

  // 踩父级评论
  async addParentBad () {
    let id = this.ctx.request.body.parentId
    let userId = this.ctx.request.body.userId
    let sql = 'select dislikeCounts, dislikerIds from comments where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].dislikerIds.indexOf(userId) >= 0) {
      this.ctx.body = {
        'msg': '当前用户已经踩过了！'
      }
    } else {
      if (result[0].dislikerIds === "") {
        const dislikerIds = userId
        const res = await this.app.mysql.update("comments", { id: id, dislikeCounts: result[0].dislikeCounts + 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '你是第一个踩成功的！'
          }
        }
      } else {
        const dislikerIds = result[0].dislikerIds + ',' + userId
        const res = await this.app.mysql.update("comments", { id: id, dislikeCounts: result[0].dislikeCounts + 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '踩成功！'
          }
        }
      }
    }
  }

  // 重置点赞
  async resetParentGood () {
    let id = this.ctx.request.body.parentId
    let userId = this.ctx.request.body.userId
    let sql = 'select likeCounts, likerIds from comments where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId) {
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, likerIds: "" })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消点赞成功！'
        }
      }
    } else {
      if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] === userId) {
        const likerIds = result[0].likerIds.replace("," + userId, "")
        const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '你取消点赞成功拉！'
          }
        }
      } else {
        const likerIds = result[0].likerIds.replace(userId + ',', "")
        const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '你取消点赞成功啦！'
          }
        }
      }
    }
  }

  // 重置点赞
  async resetParentBad () {
    let id = this.ctx.request.body.parentId
    let userId = this.ctx.request.body.userId
    let sql = 'select dislikeCounts, dislikerIds from comments where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds === userId) {
      const res = await this.app.mysql.update("comments", { id: id, dislikeCounts: result[0].dislikeCounts - 1, dislikerIds: "" })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩！'
        }
      }
    } else {
      if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] === userId) {
        const dislikerIds = result[0].dislikerIds.replace("," + userId, "")
        const res = await this.app.mysql.update("comments", { id: id, dislikeCounts: result[0].dislikeCounts - 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '你取消对他的踩拉！'
          }
        }
      } else {
        const dislikerIds = result[0].dislikerIds.replace(userId + ',', "")
        const res = await this.app.mysql.update("comments", { id: id, dislikeCounts: result[0].dislikeCounts - 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          this.ctx.body = {
            'msg': '你取消对他的踩啦！'
          }
        }
      }
    }
  }

  // 改变差评
  async changeBadComment () {
    let id = this.ctx.request.body.parentId
    let userId = this.ctx.request.body.userId
    let sql = 'select likeCounts, dislikeCounts, likerIds, dislikerIds from comments where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds === userId && result[0].likerIds === "") {
      const likerIds = result[0].likerIds + userId
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: "" })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他！'
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds === userId && result[0].likerIds !== "") {
      const likerIds = result[0].likerIds + "," + userId
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: "" })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他哟！'
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] === userId && result[0].likerIds === "") {
      const likerIds = result[0].likerIds + userId
      const dislikerIds = result[0].dislikerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他了！'
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] !== userId && result[0].likerIds === "") {
      const likerIds = result[0].likerIds + userId
      const dislikerIds = result[0].dislikerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他啦！'
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] === userId && result[0].likerIds !== "") {
      const likerIds = result[0].likerIds + ',' + userId
      const dislikerIds = result[0].dislikerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他啦！'
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] !== userId && result[0].likerIds !== "") {
      const likerIds = result[0].likerIds + ',' + userId
      const dislikerIds = result[0].dislikerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他呢！'
        }
      }
    }
  }

  // 改变好评
  async changeGoodComment () {
    let id = this.ctx.request.body.parentId
    let userId = this.ctx.request.body.userId
    let sql = 'select likeCounts, dislikeCounts, likerIds, dislikerIds from comments where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId && result[0].dislikerIds === "") {
      const dislikerIds = result[0].dislikerIds + userId
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: "", dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的赞并踩了他！'
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId && result[0].dislikerIds !== "") {
      const dislikerIds = result[0].dislikerIds + "," + userId
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: "", dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的赞并踩了他哟！'
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] === userId && result[0].dislikerIds === "") {
      const dislikerIds = result[0].dislikerIds + userId
      const likerIds = result[0].likerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的赞并踩了他了！'
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] !== userId && result[0].dislikerIds === "") {
      const dislikerIds = result[0].dislikerIds + userId
      const likerIds = result[0].likerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的赞并踩了他啦！'
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] === userId && result[0].dislikerIds !== "") {
      const dislikerIds = result[0].dislikerIds + ',' + userId
      const likerIds = result[0].likerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的赞并踩了他啦！'
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] !== userId && result[0].dislikerIds !== "") {
      const dislikerIds = result[0].dislikerIds + ',' + userId
      const likerIds = result[0].likerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comments", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        this.ctx.body = {
          'msg': '你取消了对他的赞并踩了他呢！'
        }
      }
    }
  }

  // 给子列表好评
  async addChildGood () {
    let id = this.ctx.request.body.childId
    let userId = this.ctx.request.body.userId
    let parentId = this.ctx.request.body.parentId
    let sql = 'select likeCounts, likerIds from comment_children where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].likerIds.indexOf(userId) >= 0) {
      this.ctx.body = {
        'msg': '当前用户已经点赞过了！'
      }
    } else {
      if (result[0].likerIds === "") {
        const likerIds = userId
        const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '你是第一个点赞成功！',
            data: response
          }
        }
      } else {
        const likerIds = result[0].likerIds + ',' + userId
        const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '点赞成功！',
            data: response
          }
        }
      }
    }
  }

  // 给子列表差评
  async addChildBad () {
    let id = this.ctx.request.body.childId
    let userId = this.ctx.request.body.userId
    let parentId = this.ctx.request.body.parentId
    let sql = 'select dislikeCounts, dislikerIds from comment_children where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].dislikerIds.indexOf(userId) >= 0) {
      this.ctx.body = {
        'msg': '当前用户已经点赞过了！'
      }
    } else {
      if (result[0].dislikerIds === "") {
        const dislikerIds = userId
        const res = await this.app.mysql.update("comment_children", { id: id, dislikeCounts: result[0].dislikeCounts + 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '你是第一个点赞成功！',
            data: response
          }
        }
      } else {
        const dislikerIds = result[0].likerIds + ',' + userId
        const res = await this.app.mysql.update("comment_children", { id: id, dislikeCounts: result[0].dislikeCounts + 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '点赞成功！',
            data: response
          }
        }
      }
    }
  }

  // 重置子列表好评
  async resetChildrenGood () {
    let id = this.ctx.request.body.childId
    let userId = this.ctx.request.body.userId
    let parentId = this.ctx.request.body.parentId
    let sql = 'select likeCounts, likerIds from comment_children where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId) {
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, likerIds: "" })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消点赞成功！',
          data: response
        }
      }
    } else {
      if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds.split(",")[result[0].likeCounts - 1] === userId) {
        const likerIds = result[0].likerIds.replace("," + userId, "")
        const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '你取消点赞成功拉！',
            data: response
          }
        }
      } else {
        const likerIds = result[0].likerIds.replace(userId + ',', "")
        const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, likerIds: likerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '你取消点赞成功啦！',
            data: response
          }
        }
      }
    }
  }

  // 重置子列表差评
  async resetChildrenBad () {
    let id = this.ctx.request.body.childId
    let userId = this.ctx.request.body.userId
    let parentId = this.ctx.request.body.parentId
    let sql = 'select dislikeCounts, dislikerIds from comment_children where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds === userId) {
      const res = await this.app.mysql.update("comment_children", { id: id, dislikeCounts: result[0].dislikeCounts - 1, dislikerIds: "" })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的差评！',
          data: response
        }
      }
    } else {
      if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] === userId) {
        const dislikerIds = result[0].dislikerIds.replace("," + userId, "")
        const res = await this.app.mysql.update("comment_children", { id: id, dislikeCounts: result[0].dislikeCounts - 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '你取消差评成功拉！',
            data: response
          }
        }
      } else {
        const dislikerIds = result[0].dislikerIds.replace(userId + ',', "")
        const res = await this.app.mysql.update("comment_children", { id: id, dislikeCounts: result[0].dislikeCounts - 1, dislikerIds: dislikerIds })
        if (res.affectedRows === 1) {
          let SQL = 'select childrenId, isRely from comments where id=' + parentId
          const response = await this.app.mysql.query(SQL)
          this.ctx.body = {
            'msg': '你取消差评成功啦！',
            data: response
          }
        }
      }
    }
  }

  // 改变子列表差评
  async changeChildBadComment () {
    let id = this.ctx.request.body.childId
    let userId = this.ctx.request.body.userId
    let parentId = this.ctx.request.body.parentId
    let sql = 'select likeCounts, dislikeCounts, likerIds, dislikerIds from comment_children where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds === userId && result[0].likerIds === "") {
      const likerIds = result[0].likerIds + userId
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: "" })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他！',
          data: response
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds === userId && result[0].likerIds !== "") {
      const likerIds = result[0].likerIds + "," + userId
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: "" })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他哟！',
          data: response
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] === userId && result[0].likerIds === "") {
      const likerIds = result[0].likerIds + userId
      const dislikerIds = result[0].dislikerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他了！',
          data: response
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] !== userId && result[0].likerIds === "") {
      const likerIds = result[0].likerIds + userId
      const dislikerIds = result[0].dislikerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他啦！',
          data: response
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] === userId && result[0].likerIds !== "") {
      const likerIds = result[0].likerIds + ',' + userId
      const dislikerIds = result[0].dislikerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他啦！',
          data: response
        }
      }
    } else if (result[0].dislikerIds.indexOf(userId) >= 0 && result[0].dislikerIds !== userId && result[0].dislikerIds.split(",")[result[0].dislikeCounts - 1] !== userId && result[0].likerIds !== "") {
      const likerIds = result[0].likerIds + ',' + userId
      const dislikerIds = result[0].dislikerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts + 1, dislikeCounts: result[0].dislikeCounts - 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他呢！',
          data: response
        }
      }
    }
  }

  // 改变子列表好评
  async changeChildGoodComment () {
    let id = this.ctx.request.body.childId
    let userId = this.ctx.request.body.userId
    let parentId = this.ctx.request.body.parentId
    let sql = 'select likeCounts, dislikeCounts, likerIds, dislikerIds from comment_children where id=' + id
    const result = await this.app.mysql.query(sql)
    if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId && result[0].dislikerIds === "") {
      const dislikerIds = result[0].dislikerIds + userId
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: "", dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他！',
          data: response
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds === userId && result[0].dislikerIds !== "") {
      const dislikerIds = result[0].dislikerIds + "," + userId
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: "", dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他哟！',
          data: response
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] === userId && result[0].dislikerIds === "") {
      const dislikerIds = result[0].dislikerIds + userId
      const likerIds = result[0].likerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他了！',
          data: response
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] !== userId && result[0].dislikerIds === "") {
      const dislikerIds = result[0].dislikerIds + userId
      const likerIds = result[0].likerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他啦！',
          data: response
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] === userId && result[0].dislikerIds !== "") {
      const dislikerIds = result[0].dislikerIds + ',' + userId
      const likerIds = result[0].likerIds.replace("," + userId, "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他啦！',
          data: response
        }
      }
    } else if (result[0].likerIds.indexOf(userId) >= 0 && result[0].likerIds !== userId && result[0].likerIds.split(",")[result[0].likeCounts - 1] !== userId && result[0].dislikerIds !== "") {
      const dislikerIds = result[0].dislikerIds + ',' + userId
      const likerIds = result[0].likerIds.replace(userId + ",", "")
      const res = await this.app.mysql.update("comment_children", { id: id, likeCounts: result[0].likeCounts - 1, dislikeCounts: result[0].dislikeCounts + 1, likerIds: likerIds, dislikerIds: dislikerIds })
      if (res.affectedRows === 1) {
        let SQL = 'select childrenId, isRely from comments where id=' + parentId
        const response = await this.app.mysql.query(SQL)
        this.ctx.body = {
          'msg': '你取消了对他的踩并赞了他呢！',
          data: response
        }
      }
    }
  }

  // 获取喜欢这本书的人
  async getLikeBookPersonList () {
    let id = this.ctx.params.id
    let sql = 'select likers from book_info where id=' + id
    const result = await this.app.mysql.query(sql)
    const userId = result[0].likers
    this.ctx.body = {
      data: userId
    }
  }

  // 通过userId获取用户信息
  async getUserInfo () {
    let id = this.ctx.params.id
    let sql = 'select * from user where id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result[0]
    }
  }

  // 通过用户id获取用户喜欢的书籍
  async getLikeBookList () {
    let id = this.ctx.params.id
    let sql = 'SELECT book_info.id as id ,' +
      'book_info.bookName as bookName ,' +
      'book_info.author as authName ,' +
      "FROM_UNIXTIME(book_info.addTime,'%Y-%m-%d %H:%m:%S') as addTime ," +
      'book_info.bookImg as bookImg ,' +
      'book_info.view_count as view_count ,' +
      'book_info.creator as creator ,' +
      'book_info.price as price ,' +
      'book_info.email as email ,' +
      'book_info.creatorId as creatorId ,' +
      'book_info.likers as likers ' +
      'FROM book_info ' +
      'ORDER BY book_info.view_count DESC'
    const result = await this.app.mysql.query(sql)
    let arr = result.filter((item) => {
      return item.likers.indexOf(id) >= 0
    })
    this.ctx.body = {
      data: arr
    }
  }

  // 通过用户id获取用户推荐的书籍
  async getIssueBookList () {
    let id = this.ctx.params.id
    let sql = 'SELECT book_info.id as id ,' +
      'book_info.bookName as bookName ,' +
      'book_info.author as authName ,' +
      "FROM_UNIXTIME(book_info.addTime,'%Y-%m-%d %H:%m:%S') as addTime ," +
      'book_info.bookImg as bookImg ,' +
      'book_info.view_count as view_count ,' +
      'book_info.creator as creator ,' +
      'book_info.price as price ,' +
      'book_info.email as email ,' +
      'book_info.creatorId as creatorId ,' +
      'book_info.likers as likers ' +
      'FROM book_info ' +
      'where book_info.creatorId =' + id +
      ' ORDER BY book_info.view_count DESC'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  // 通过用户id获取用户详细信息
  async getUserInfoById () {
    let id = this.ctx.params.id
    let sql = 'select * from user where id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  // 通过姓名获取id
  async getUserIdByName () {
    let name = this.ctx.query.name
    let result = await this.app.mysql.select("user", { where: { username: name } })
    this.ctx.body = {
      data: result
    }
  }

  // 删除书籍通过id
  async deleteBookById () {
    let id = this.ctx.request.body.id
    let result = await this.app.mysql.delete('book_info',{ id: id });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '删除成功！'
      }
    }
  }

  // 添加简介
  async addIntroduce () {
    let id = this.ctx.request.body.userId
    let introduce = this.ctx.request.body.content 
    let result = await this.app.mysql.update('user',{ id: parseInt(id), introduce: introduce });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'msg': '添加简介成功'
      }
    }
  }

  async getUserLikeListById () {
    let id = this.ctx.params.id 
    let sql = 'select likeIds from user where id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  async getUserFansListById () {
    let id = this.ctx.params.id 
    let sql = 'select fanIds from user where id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  async getUserGoodsListById () {
    let id = this.ctx.params.id 
    let sql = 'select goodIds from user where id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }

  async getLikeList () {
    let code = this.ctx.query.code.replace("'", "")
    let sql = " select * from book_info where book_info.bookName like '%" + code + "%' " 
    const res = await this.app.mysql.query(sql)
    if (res.length === 0) {
      this.ctx.body = {
        data: []
      }
    } else {
      this.ctx.body = {
        data: res
      }
    }
  }

}



module.exports = HomeController;
