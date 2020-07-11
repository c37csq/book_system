module.exports = app => {
  const {router,controller} = app
  var adminauth = app.middleware.adminauth()
  // 后台接口
  router.post('/admin/checkLogin', controller.admin.checkLogin);
  router.get('/admin/getBannerUrls', adminauth, controller.admin.getBannerUrls);
  router.get('/admin/getBannerUrlsById/:id', adminauth, controller.admin.getBannerUrlsById);
  router.post('/admin/updateBannerUrl', adminauth, controller.admin.updateBannerUrl);
  router.post('/admin/deleteBannerUrl', adminauth, controller.admin.deleteBannerUrl);
  router.post('/admin/addBannerUrl', adminauth, controller.admin.addBannerUrl);
  router.get('/admin/getBookList', adminauth, controller.admin.getBookList);
  router.get('/admin/getBookDetailById/:id', adminauth, controller.admin.getBookDetailById);
  router.post('/admin/updateTypeName', adminauth, controller.admin.updateTypeName);
  router.get('/admin/getTypeNameById/:id', adminauth, controller.admin.getTypeNameById);
  router.get('/admin/getBooksType', adminauth, controller.admin.getBooksType);
  router.post('/admin/addTypeName', adminauth, controller.admin.addTypeName);
  router.post('/admin/deleteTypeName', adminauth, controller.admin.deleteTypeName);
  router.post('/admin/updateBookType', adminauth, controller.admin.updateBookType);
  router.get('/admin/getParentMsgList', adminauth, controller.admin.getParentMsgList);
  router.get('/admin/getChildrenMsgList', adminauth, controller.admin.getChildrenMsgList);
  router.get('/admin/getParentContentById/:id', adminauth, controller.admin.getParentContentById);
  router.get('/admin/getChildrenContentById/:id', adminauth, controller.admin.getChildrenContentById);
  router.post('/admin/updateParentContent', adminauth, controller.admin.updateParentContent);
  router.post('/admin/updateChildrenContent', adminauth, controller.admin.updateChildrenContent);
  router.post('/admin/deleteParentComment', adminauth, controller.admin.deleteParentComment);
  router.post('/admin/deleteChildrenComment', adminauth, controller.admin.deleteChildrenComment);
  router.post('/admin/replaceChildrenId', adminauth, controller.admin.replaceChildrenId);
  router.get('/admin/getBookTypeCounts', adminauth, controller.admin.getBookTypeCounts);
}