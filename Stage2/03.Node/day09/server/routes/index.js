const users = require('./users')
const welcomeLink = require('../controller/welcome')
const userModel=require('../models/users')
module.exports = (router) => {
  // ? 初始化界面
  router.get('/', welcomeLink.main)
  // todo 用户模块
  users(router)
}

