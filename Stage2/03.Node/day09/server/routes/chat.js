const chatPage=require('../controller/chat')
module.exports =  (router) => {
  // ! 添加聊天记录进数据库
  router.post ('/addContent', chatPage.addContent)
  // ! 轮询
  router.get('/chat/refresh',chatPage.pageRefresh)
}