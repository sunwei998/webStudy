const users = require('./users')
const chat=require('./chat')
const welcomeLink = require('../controller/welcome')
const userModel=require('../models/users')
module.exports = (router) => {
  // ? 初始化界面
  router.get('/', welcomeLink.main)
  // todo 用户模块
  users(router)
  chat(router)
}

