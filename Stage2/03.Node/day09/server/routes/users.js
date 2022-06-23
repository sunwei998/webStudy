const loginLink=require('../controller/login')
const chatPage=require('../controller/chat')
module.exports =  (router) => {
  router.get('/login', loginLink.login),
  // ! 检查用户名密码
  router.get('/checkLogin', loginLink.checkLogin)

  // ! 通过缓存检查登录状态
  router.get('/chat',chatPage.chatCheck)
}

