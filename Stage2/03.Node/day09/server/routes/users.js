const loginLink=require('../controller/login')
const chatPage=require('../controller/chat')
module.exports =  (router) => {
  router.get('/login', loginLink.login),
  router.get('/checkLogin', loginLink.checkLogin)
  router.get('/chat',chatPage.chatCheck)
}

